import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceivingsComponent } from './receivings.component';
import { ReceivingInputComponent } from './receiving-input/receiving-input.component';





const routes: Routes = [
    {path: '', component: ReceivingsComponent},
    {path: 'create', component: ReceivingInputComponent},
    {path: 'edit/:receivingId', component: ReceivingInputComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceivingsRoutingModule {}
