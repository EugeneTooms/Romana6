import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../../angular-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReceivingsRoutingModule } from './receivings-routing';


import { ReceivingsListComponent } from './receivings-list/receivings-list.component';
import { ReceivingsComponent } from './receivings.component';
import { ReceivingInputComponent } from './receiving-input/receiving-input.component';


@NgModule({
  declarations: [
    ReceivingsComponent,
    ReceivingsListComponent,
    ReceivingInputComponent
  ],
  imports: [CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ReceivingsRoutingModule
 ]
})
export class ReceivingsModule {}
