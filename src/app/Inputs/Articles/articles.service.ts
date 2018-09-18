import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment} from '../../../environments/environment';
import { Article } from './article.model';

const BACKEND_URL = environment.apiURL + 'articles/';
@Injectable({providedIn : 'root'})
export class ArticlesService {
  private articles: Article[] = [];
  private articlesUpdated = new Subject<Article[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getArticles() {
    this.http.get<{message: string, data: Article[]}>(BACKEND_URL)
      .subscribe( (articlesData) => {
        this.articles = articlesData.data;
        this.articlesUpdated.next([...this.articles]);
      });
  }
  getArticle(id: number) {
    return {...this.articles.find(article => article.id === id)};
  }
  getArticlesListener() {
    return this.articlesUpdated.asObservable();
  }
  addArticle(article: Article) {
    this.http.post<{message: string, data: number}>(BACKEND_URL, article)
      .subscribe( (responseData) => {
        article.id = responseData.data;
        this.articles.push(article);
        this.articlesUpdated.next([...this.articles]);
        this.router.navigate(['/inputs/articles']);
      });
  }
  updateArticle(article: Article) {
    this.http.put<{message: string, data: number}>(BACKEND_URL + article.id, article)
      .subscribe( (responseData) => {
        this.router.navigate(['/inputs/articles']);
      });
  }
  deleteArticle(article_id: number) {
    this.http.delete<{message: string, data: any}>(BACKEND_URL + article_id)
      .subscribe( (responseData) => {
        console.log(responseData);
        const updateArticles = this.articles.filter( article => article.id !== article_id);
        this.articles = updateArticles;
        this.articlesUpdated.next([...this.articles]);
      });
  }
}
