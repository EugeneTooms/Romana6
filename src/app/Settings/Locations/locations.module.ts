import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../angular-material.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsComponent } from './locations.component';
import { LocationDetailComponent } from './location-detail/location-detail.component';



@NgModule ({
  declarations: [LocationsComponent, LocationDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    LocationsRoutingModule,
    DragDropModule
  ]
})
export class LocationsModule {}
