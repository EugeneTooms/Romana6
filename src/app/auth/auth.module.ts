import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AngularMaterialModule } from '../angular-material.module';

import { LogInComponent } from './login/login.component';


@NgModule({
  declarations : [LogInComponent],
  imports : [
    CommonModule,
    FormsModule,
    AngularMaterialModule
  ],
  exports: [LogInComponent]
})
export class AuthModule {}
