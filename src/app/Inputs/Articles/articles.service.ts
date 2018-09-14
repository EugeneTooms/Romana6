import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../../environments/environment';
import { Article } from './article.model';


const BACKEND_URL = environment.apiURL + 'articles/';
@Injectable({providedIn : 'root'})
export class ArticlesService {
  private articles: Article[] = [];

  constructor(private http: HttpClient) {}

  getArticles() {
    this.http.get<{message: string, data: Article[]}>(BACKEND_URL)
      .subscribe( (articlesData) => {
        this.articles = articlesData.data;
        console.log(this.articles);
      });
  }
}
