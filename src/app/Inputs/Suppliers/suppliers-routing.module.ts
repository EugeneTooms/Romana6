import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuppliersListComponent } from './suppliers-list/suppliers-list.component';
import { SupplierInputComponent } from './supplier-input/supplier-input.component';



const routes: Routes = [
  {path: '', component: SuppliersListComponent},
  {path: 'create', component: SupplierInputComponent},
  {path: 'edit/:supplierId', component: SupplierInputComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule {}
