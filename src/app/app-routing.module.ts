import { NgModule} from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { LogInComponent } from './auth/login/login.component';
import { ArtikliComponent } from './Ulazi/Artikli/artikli.component';

const routes: Routes = [
  {path: '', component: ArtikliComponent},
  {path: 'artikli', component: ArtikliComponent},
  {path: 'login', component: LogInComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
