import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment} from '../../../environments/environment';

import { Location } from './location.model';
import { LocationArticle } from './location-article.model';

const BACKEND_URL = environment.apiURL + 'locations/';
@Injectable({providedIn : 'root'})
export class LocationsService {
  private locations: Location[] = [];
  private locationArticles: LocationArticle[] = [];

  private locationsUpdated = new Subject<Location[]>();
  private locationArticlesUpdated = new Subject<LocationArticle[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getLocation(id: number) {
    return {...this.locations.find(location => location.id === id)};
  }
  getLocationsListener() {
    return this.locationsUpdated.asObservable();
  }
  getLocationsArticlesListener() {
    return this.locationArticlesUpdated.asObservable();
  }

  getLocations() {
    this.http.get<{message: string, data: any}>(BACKEND_URL)
      .pipe(map((locationData) => {
        return locationData.data.map( location => {
          return {
            id: location.id,
            location_name: location.naziv_lokacije,
            position: location.pozicija
          };
        });
      }))
      .subscribe(transLocations => {
        this.locations = transLocations;
        this.locationsUpdated.next([...this.locations]);
      });
  }
  getLocationArticles(id: number) {
    this.http.get<{message: string, data: any}>(BACKEND_URL + 'articles/' + id)
      .pipe(map((articlesData) => {
        return articlesData.data.map( article => {
          return {
            article_id: article.article_id,
            location_id: article.location_id,
            name: article.name,
            indeks: article.indeks
          };
        });
      }))
      .subscribe(transArticles => {
        this.locationArticles = transArticles;
        this.locationArticlesUpdated.next([...this.locationArticles]);
      });
  }

  addLocation(location: Location) {
    this.http.post<{message: string, data: number}>(BACKEND_URL, location)
      .subscribe( (responseData) => {
        location.id = responseData.data;
        this.locations.push(location);
        this.locationsUpdated.next([...this.locations]);
      });
  }
  // updateArticle(article: Article) {
  //   this.http.put<{message: string, data: number}>(BACKEND_URL + article.id, article)
  //     .subscribe( (responseData) => {
  //       this.router.navigate(['/inputs/articles']);
  //     });
  // }
  // deleteArticle(article_id: number) {
  //   this.http.delete<{message: string, data: any}>(BACKEND_URL + article_id)
  //     .subscribe( (responseData) => {
  //       console.log(responseData);
  //       const updateArticles = this.articles.filter( article => article.id !== article_id);
  //       this.articles = updateArticles;
  //       this.articlesUpdated.next([...this.articles]);
  //     });
  // }
}
