import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsComponent } from './locations.component';
import { LocationDetailComponent } from './location-detail/location-detail.component';



const routes: Routes = [
  {path: '', component: LocationsComponent},
  {path: ':locationid', component: LocationDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationsRoutingModule {}
