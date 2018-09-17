import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticlesComponent } from './articles.component';
import { ArticleInputComponent } from './article-input/article-input.component';

const routes: Routes = [
  {path: '', component: ArticlesComponent},
  {path: 'create', component: ArticleInputComponent},
  {path: 'edit/:articleId', component: ArticleInputComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule {}
