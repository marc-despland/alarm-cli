import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent }  from './signin/signin.component';
import { ApplicationsComponent }  from './applications/applications.component';

const appRoutes: Routes = [
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'applications',
    component: ApplicationsComponent
  },
  { path: '',   redirectTo: '/signin', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true

      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class AppRoutingModule { }