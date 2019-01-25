import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import { PopUpSelectorComponent } from '../../../popUpSelector/pop-up-selector.components';
import { LocationsService } from '../locations.services';
import { LocationArticle } from '../location-article.model';
import { Location } from '../location.model';

@Component({
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css']
})

export class LocationDetailComponent implements OnInit, OnDestroy {
  locationid: number;
  currentLocation: Location;

  locations: Location[] = [];
  locationArticles: LocationArticle[] = [];

  private locationsSub: Subscription;
  private articlesSub: Subscription;

  mode = 'articles';
  isLoading = true;
  constructor(
    private dialog: MatDialog,
    public locationsService: LocationsService,
    public route: ActivatedRoute) {}

  drop(event: CdkDragDrop<string[]>) {
      moveItemInArray(this.locationArticles, event.previousIndex, event.currentIndex);

      this.locationArticles[event.currentIndex].indeks = event.currentIndex + 1; // set new indeks

      // Sort by new indeks
      const sorted = this.locationArticles.sort((l1 , l2) => l1.indeks - l2.indeks );
      this.locationArticles = sorted;
      this.locationArticles.forEach( (article, index) => {
        article.indeks = index + 1 ;
      });
  }
  fetchLocations(id: number) {
    this.locationsService.getLocations();
    this.locationsSub = this.locationsService.getLocationsListener()
      .subscribe( (locations: Location[]) => {
        this.locations = locations.filter(x =>
           ( (x.position.startsWith(this.currentLocation.id.toString())) && (x.position.length === 3) ));
        this.mode = 'locations';
        if (this.locations.length === 0) {
          this.mode = 'empty';
        }
        this.isLoading = false;
      }, () => {this.isLoading = false; });
  }
  fetchArticles() {
    this.locationsService.getLocationArticles(this.locationid);
    this.articlesSub = this.locationsService.getLocationsArticlesListener()
    .subscribe((locationArticles: LocationArticle[]) => {
      this.locationArticles = locationArticles;
      this.isLoading = false;
      if (this.locationArticles.length === 0) {
        this.fetchLocations(this.locationid);
      }
      this.mode = 'articles';
    }, () => {this.isLoading = false; });
  }
  ngOnInit() {
    this.route.paramMap.subscribe( (paramMap: ParamMap) => {
      if (paramMap.has('locationid')) {
        this.locationid = +paramMap.get('locationid');
        this.currentLocation = this.locationsService.getLocation(this.locationid);
        this.fetchArticles();
        this.isLoading = false;
      }
    });
  }
  AddLocation(form: NgForm) {
    const postionstring = this.locations[0].position.slice(0, -1) + (this.locations.length + 1).toString();
    const newLocation: Location = {
      id: null,
      location_name: form.value.naziv,
      position: postionstring
    };
    this.locationsService.addLocation(newLocation);
    this.mode = 'locations';
  }
  AddArticle() {
    const dialogRef = this.dialog.open(PopUpSelectorComponent, {
      height: '90%',
      width: '70%',
      data: {data: 'Article'}});

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (!(this.locationArticles.find( article => article.article_id === result.id)))  {
          const newarticle: LocationArticle = {
            article_id: result.id,
            location_id: this.currentLocation.id,
            name: result.name,
            indeks: this.locationArticles.length + 1};
          this.locationArticles.push(newarticle);
          this.mode = 'articles';
        }
      }
    });
  }
  RemoveArticle(id: number) {
    const updateArticles = this.locationArticles.filter( article => article.article_id !== id);

    // sort
    const sorted = updateArticles.sort((l1 , l2) => l1.indeks - l2.indeks );
    this.locationArticles = sorted;
    this.locationArticles.forEach( (article, index) => {
      article.indeks = index + 1 ;
    });
  }
  ngOnDestroy() {
    if (this.mode === 'locations') {
      this.locationsSub.unsubscribe();
    }
    this.articlesSub.unsubscribe();
  }
}
