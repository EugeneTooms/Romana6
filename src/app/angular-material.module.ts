import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatGridListModule,
  MatTableModule,
  MatPaginatorModule,
  MatIconModule,
  MatStepperModule,
  MatSelectModule
  } from '@angular/material';

@NgModule({
    exports: [
      MatToolbarModule,
      MatInputModule,
      MatCardModule,
      MatButtonModule,
      MatExpansionModule,
      MatProgressSpinnerModule,
      MatMenuModule,
      MatGridListModule,
      MatTableModule,
      MatPaginatorModule,
      MatIconModule,
      MatStepperModule,
      MatSelectModule
    ]
})
export class AngularMaterialModule {}
