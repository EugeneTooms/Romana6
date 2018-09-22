import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../../angular-material.module';

import { TaxGroupComponent } from './tax-group.component';
import { TaxGroupListComponent } from './tax-groups-list/tax-group-list.component';
import { TaxGroupInputComponent } from './tax-groups-input/tax-group-input.component';
import { FormsModule } from '@angular/forms';




@NgModule ({
  declarations: [
    TaxGroupComponent,
    TaxGroupListComponent,
    TaxGroupInputComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule
  ]
})
export class TaxGroupsModule {}
