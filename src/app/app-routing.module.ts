import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApplicationsComponent }  from './applications/applications.component';

const appRoutes: Routes = [
  {
    path: 'applications',
    component: ApplicationsComponent
  },
  { path: '',   redirectTo: '/applications', pathMatch: 'full' }
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