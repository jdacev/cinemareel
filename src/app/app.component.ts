import { AuthService } from './services/auth-service';
import { Component } from '@angular/core';
import { NotifierService } from 'angular-notifier';

import {NgForm} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  loading = false;
  submitted = false;
  returnUrl: string;
  notifier: NotifierService;

  constructor (
    notifierService: NotifierService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.notifier = notifierService;
  }

  entrar(f: NgForm) {
    
    this.loading = true;
    this.spinner.show();
    var username = f.value.user;
    var password = f.value.pass;
    this.authService.login(username, password).then((data: any) => {

      if (data.errType == 0) {
        console.log('credenciales válidas: ' + JSON.stringify(data) );
        this.router.navigate(['portal-home']);
        console.log(this.router);
      } else {
        console.log('error ' + JSON.stringify(data) );
        this.notifier.notify('error', data.message);
      }
    }).then(()=> {
      this.loading = false;
      this.spinner.hide();
    });
  }
}
