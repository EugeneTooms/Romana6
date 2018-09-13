import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesComponent } from './articles.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticleInputComponent } from './article-input/article-input.component';
import { AngularMaterialModule } from '../../angular-material.module';


@NgModule({
  declarations: [
    ArticlesComponent,
    ArticlesListComponent,
    ArticleInputComponent
  ],
  imports: [CommonModule, AngularMaterialModule ]
})
export class ArticlesModule {}
