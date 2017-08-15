import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { Router } from '@angular/router';

import { AppRoutingModule }        from './app-routing.module';
import { AlarmmgtService} from './alarmmgt/alarmmgt.service';
import { GlobalsService} from './globals.service';


import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { ApplicationsComponent } from './applications/applications.component';
import { ApplicationComponent } from './application/application.component';
import { IntrusionsComponent } from './intrusions/intrusions.component';
import { IntrusionComponent } from './intrusion/intrusion.component';
import { ImageComponent } from './image/image.component';
//import { CollapseModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    ApplicationsComponent,
    ApplicationComponent,
    IntrusionsComponent,
    IntrusionComponent,
    ImageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    AlarmmgtService,
    GlobalsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
 }
