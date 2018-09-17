import { NgModule} from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { HomePageComponent } from './homePage/home-page.component';
import { LogInComponent } from './auth/login/login.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'login', component: LogInComponent},
  {path: 'inputs', loadChildren: './Inputs/inputs.module#InputsModule', canActivate: [AuthGuard]},
  {path: 'outputs', loadChildren: './Outputs/outputs.module#OutputsModule', canActivate: [AuthGuard]},
  {path: 'settings', loadChildren: './Settings/settings.module#SettingsModule', canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule {}
