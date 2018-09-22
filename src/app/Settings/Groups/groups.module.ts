import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../angular-material.module';

import { TaxGroupsModule } from './taxGropus/tax-groups.module';
import { GroupsRoutingModule } from './groups-routing.module';




@NgModule ({
  declarations: [],
  imports: [
    CommonModule,
    AngularMaterialModule,
    GroupsRoutingModule,
    TaxGroupsModule
  ]
})
export class GroupsModule {}
