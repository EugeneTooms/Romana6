import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductInputComponent } from './product-input/product-input.component';




const routes: Routes = [
   {path: '', component: ProductsComponent},
   {path: 'create', component: ProductInputComponent},
   {path: 'edit/:productId', component: ProductInputComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
