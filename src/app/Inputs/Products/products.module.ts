import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../../angular-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductInputComponent } from './product-input/product-input.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductsListComponent,
    ProductInputComponent
  ],
  imports: [CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ProductsRoutingModule
 ]
})
export class ProductsModule {}
