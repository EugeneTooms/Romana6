import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../../angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { SuppliersRoutingModule } from './suppliers-routing.module';
import { SuppliersListComponent } from './suppliers-list/suppliers-list.component';
import { SupplierInputComponent } from './supplier-input/supplier-input.component';




@NgModule({
  declarations: [
    SuppliersListComponent,
    SupplierInputComponent
  ],
  imports: [CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    SuppliersRoutingModule ]
})
export class SuppliersModule {}
