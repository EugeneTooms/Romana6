import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../../angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing';


@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    ProductsRoutingModule
 ]
})
export class ProductsModule {}
