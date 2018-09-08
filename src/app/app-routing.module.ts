import { NgModule} from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { LogInComponent } from './auth/login/login.component';
import { ArtikliComponent } from './Ulazi/Artikli/artikli.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: '', component: ArtikliComponent},
  {path: 'login', component: LogInComponent},
  {path: 'artikli', component: ArtikliComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule {}
