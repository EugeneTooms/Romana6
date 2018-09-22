import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxGroupComponent } from './taxGropus/tax-group.component';


const routes: Routes = [
  {path: 'tax', component: TaxGroupComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule {}
