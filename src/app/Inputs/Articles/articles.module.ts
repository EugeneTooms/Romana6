import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../../angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './articles.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticleInputComponent } from './article-input/article-input.component';


@NgModule({
  declarations: [
    ArticlesComponent,
    ArticlesListComponent,
    ArticleInputComponent
  ],
  imports: [CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    ArticlesRoutingModule ]
})
export class ArticlesModule {}
