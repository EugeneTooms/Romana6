import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';

import { ArticlesService } from '../articles.service';
import { Article } from '../article.model';

@Component({
  selector: 'app-articles-list',
  templateUrl : './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})

export class ArticlesListComponent implements OnInit, OnDestroy {
  articles: Article[] = [];
  private artSub: Subscription;

  displayedColumns: string[] = ['id', 'name' , 'Select', 'Edit', 'Delete', 'Add'];
  dataSource = new MatTableDataSource(this.articles);

  constructor (public articlesService: ArticlesService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.articlesService.getArticles();
    this.artSub = this.articlesService.getArticlesListener()
      .subscribe((articles: Article[]) => {
        this.articles = articles;
        this.dataSource.data = this.articles;
        this.dataSource.paginator = this.paginator;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.artSub.unsubscribe();
  }
}
