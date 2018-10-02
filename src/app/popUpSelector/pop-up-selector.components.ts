import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {MatTableDataSource} from '@angular/material';

import { ArticlesService } from '../Inputs/Articles/articles.service';
import { Article } from '../Inputs/Articles/article.model';
import { Subscription } from 'rxjs';


export interface SelectorData {
  id: number;
  name: string;
}

@Component({
  templateUrl: './pop-up-selector.components.html',
  styleUrls: ['./pop-up-selector.components.css']
})
export class PopUpSelectorComponent implements OnInit, OnDestroy {
  errmessage: string;
  articles: Article[] = [];
  table: SelectorData[] = [];
  private artSub: Subscription;
  isLoading = true;
  constructor(
    public dialogRef: MatDialogRef<PopUpSelectorComponent>,
    public articlesService: ArticlesService ,
    @Inject(MAT_DIALOG_DATA) public selector: {data: string}) {}

  displayedColumns: string[] = ['id', 'name', 'select'];
  dataSource = new MatTableDataSource(this.table);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  SelectArticles() {
    this.articlesService.getArticles();
    this.artSub = this.articlesService.getArticlesListener()
      .subscribe((articles: Article[]) => {
        this.table = articles;
        this.dataSource.data = this.table;
        this.isLoading = false;
      }, () => {this.isLoading = false; });
  }
  ngOnInit() {
    switch (this.selector.data) {
      case 'Article': {

         this.SelectArticles();
         break;
      }
      case 'Products': {

        break;
     }
      default: {
        this.errmessage = 'Invalid Selector Chosen';
         break;
      }
   }
  }
  closeDialog(id: number, name: string) {
    this.dialogRef.close({id, name});
  }
  ngOnDestroy() {
    switch (this.selector.data) {
      case 'Article': {
         this.artSub.unsubscribe();
         break;
      }
      case 'Products': {

        break;
     }
      default: {
         break;
      }
   }
  }
}
