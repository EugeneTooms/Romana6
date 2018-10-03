import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceivingsComponent } from './receivings.components';





const routes: Routes = [
    {path: '', component: ReceivingsComponent},
  //  {path: 'create', component: ProductInputComponent},
  //  {path: 'edit/:productId', component: ProductInputComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceivingsRoutingModule {}
