import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { Router } from '@angular/router';

import { AppRoutingModule }        from './app-routing.module';
import { AlarmmgtService} from './alarmmgt/alarmmgt.service';

import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { ApplicationsComponent } from './applications/applications.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    ApplicationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [AlarmmgtService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
 }
