import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NotifierModule } from 'angular-notifier';
import { HttpModule } from "@angular/http";

import { AppComponent } from './app.component';

import { HomeComponent } from './components/home/home.component';

import { FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AlertComponent } from './components/alert/alert.component';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlertComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NotifierModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
