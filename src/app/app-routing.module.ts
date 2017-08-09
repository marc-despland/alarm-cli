import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent }  from './signin/signin.component';
import { ApplicationsComponent }  from './applications/applications.component';
import { ApplicationComponent }  from './application/application.component';
import { IntrusionsComponent }  from './intrusions/intrusions.component';
import { IntrusionComponent }  from './intrusion/intrusion.component';


const appRoutes: Routes = [
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'applications',
    component: ApplicationsComponent
  },
  {
    path: 'application/:id',
    component: ApplicationComponent
  },
  {
    path: 'application/:appid/intrusions',
    component: IntrusionsComponent
  },
  {
    path: 'application/:appid/intrusion/:intid',
    component: IntrusionComponent
  },
  { path: '',   redirectTo: '/signin', pathMatch: 'full' },
  { path: '**',   redirectTo: '/signin', pathMatch: 'full' }
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