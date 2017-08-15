import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlarmmgtService} from './alarmmgt/alarmmgt.service';

import { SigninComponent }  from './signin/signin.component';
import { ApplicationsComponent }  from './applications/applications.component';
import { ApplicationComponent }  from './application/application.component';
import { IntrusionsComponent }  from './intrusions/intrusions.component';
import { IntrusionComponent }  from './intrusion/intrusion.component';
import { ImageComponent }  from './image/image.component';

const appRoutes: Routes = [
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'application/:appid',
    component: ApplicationComponent,
    canActivate: [AlarmmgtService]
  },
  {
    path: 'application/:appid/liveimage',
    component: ImageComponent,
    canActivate: [AlarmmgtService]
  },
  {
    path: 'application/:appid/intrusions',
    component: IntrusionsComponent,
    canActivate: [AlarmmgtService]
  },
  {
    path: 'application/:appid/intrusion/:intid',
    component: IntrusionComponent,
    canActivate: [AlarmmgtService]
  },
  {
    path: 'application/:appid/intrusion/:intid/image/:imageid',
    component: ImageComponent,
    canActivate: [AlarmmgtService]
  },
  { path: '',   redirectTo: '/signin', pathMatch: 'full' },
  { path: '**',   redirectTo: '/signin', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false

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