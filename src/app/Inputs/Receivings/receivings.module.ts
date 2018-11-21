import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../../angular-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReceivingsRoutingModule } from './receivings-routing';
import { FlexLayoutModule } from '@angular/flex-layout';

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
    ReceivingsRoutingModule,
    FlexLayoutModule
 ]
})
export class ReceivingsModule {}
