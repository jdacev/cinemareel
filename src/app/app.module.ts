import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { HttpModule } from "@angular/http";

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AlertComponent } from './components/alert/alert.component';
import { LoginComponent } from './components/login/login.component';

import { NgxSpinnerModule } from 'ngx-spinner';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';


const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'left',
			distance: 20
		},
		vertical: {
			position: 'bottom',
			distance: 20,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 3000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'fade',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NotifierModule,
    FormsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    NotifierModule.withConfig(customNotifierOptions),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
