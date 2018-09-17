import { Component } from '@angular/core';
import { Article } from './article.model';


export interface Tile {
  color: string;
  cols: number;
  rows: number;

}

@Component({
    templateUrl : './articles.component.html',
    styleUrls: ['./articles.component.css']
})

export class ArticlesComponent {
  tiles: Tile[] = [
    {cols: 3, rows: 3, color: 'white'},
    {cols: 1, rows: 6, color: '#e6e6e6'},
    {cols: 3, rows: 3, color: '#f2f2f2'}
  ];

  selectedArticle: Article;
}
