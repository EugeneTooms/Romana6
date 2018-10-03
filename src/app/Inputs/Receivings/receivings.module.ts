import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../../angular-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReceivingsComponent } from './receivings.components';
import { ReceivingsRoutingModule } from './receivings-routing';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    ReceivingsComponent
  ],
  imports: [CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ReceivingsRoutingModule,
    FlexLayoutModule
 ]
})
export class ReceivingsModule {}
