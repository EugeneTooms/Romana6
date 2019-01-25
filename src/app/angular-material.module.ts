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
  MatSelectModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatListModule
  } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    exports: [
      FlexLayoutModule,
      MatListModule,
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
      MatSelectModule,
      MatDialogModule,
      MatDatepickerModule,
      MatNativeDateModule
    ]
})
export class AngularMaterialModule {}
