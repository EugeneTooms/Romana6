import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesModule } from './Articles/articles.module';
import { InputsRoutingModule } from './inputs-routing.module';

@NgModule ({
  imports: [
    CommonModule,
    ArticlesModule,
    InputsRoutingModule
  ]
})
export class InputsModule {}
