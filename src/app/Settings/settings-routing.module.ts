import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
   {path: 'groups', loadChildren: './Groups/groups.module#GroupsModule'},
   {path: 'locations', loadChildren: './Locations/locations.module#LocationsModule'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
