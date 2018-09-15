import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment} from '../../../environments/environment';
import { Article } from './article.model';


const BACKEND_URL = environment.apiURL + 'articles/';
@Injectable({providedIn : 'root'})
export class ArticlesService {
  private articles: Article[] = [];
  private articlesUpdated = new Subject<Article[]>();

  constructor(private http: HttpClient) {}

  getArticles() {
    this.http.get<{message: string, data: Article[]}>(BACKEND_URL)
      .subscribe( (articlesData) => {
        this.articles = articlesData.data;
        this.articlesUpdated.next([...this.articles]);
      });
  }
  getArticlesListener() {
    return this.articlesUpdated.asObservable();
  }
  addArticle() {
    this.articlesUpdated.next([...this.articles]);
  }
}
