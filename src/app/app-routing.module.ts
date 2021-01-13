import { LicenceDetailComponent } from './licence-detail/licence-detail.component';
import { LicenceMasterComponent } from './licence-master/licence-master.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: LicenceMasterComponent,
    pathMatch: 'full'
  },
  {
    path: 'details/:id',
    component: LicenceDetailComponent,
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
