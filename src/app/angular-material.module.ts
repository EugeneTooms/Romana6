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
  MatPaginatorModule
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
      MatPaginatorModule
    ]
})
export class AngularMaterialModule {}
