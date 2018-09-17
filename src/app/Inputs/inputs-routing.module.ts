import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: 'articles', loadChildren: './Articles/articles.module#ArticlesModule'},
  {path: 'suppliers', loadChildren: './Suppliers/suppliers.module#SuppliersModule'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InputsRoutingModule {}
