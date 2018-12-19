import { AuthService } from '../../services/auth-service';
import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';

import {NgForm} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import  { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;
  returnUrl: string;
  notifier: NotifierService;

  constructor(
    notifierService: NotifierService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.notifier = notifierService;
   }

  ngOnInit() {

  }

  registrarme(f: NgForm){
    this.loading = true;
    this.spinner.show();
    console.log(f);
    this.authService.signup(
      f.value.emailreg, 
      f.value.firstname, 
      f.value.lastname, 
      f.value.password).then((data: any) => {

      if (data.errType == 0) {
        //this.alertService.success('Registration successful', true);
        this.router.navigate(['/portal-home']);
      } else {
        console.log('error ' + JSON.stringify(data) );
        //this.alertService.error(JSON.stringify(data));
        this.router.navigate(['/login']);
        this.notifier.notify('error', data.message);
      }
    }).then(()=> {
      this.loading = false;
      this.spinner.hide();
    });
  }

  entrar(f: NgForm) {
    
    this.loading = true;
    this.spinner.show();
    
    this.authService.login(
      f.value.email, 
      f.value.pass).then((data: any) => {

      if (data.errType == 0) {
        //this.alertService.success('Registration successful', true);
        this.router.navigate(['/portal-home']);
      } else {
        console.log('error ' + JSON.stringify(data) );
        //this.alertService.error(JSON.stringify(data));
        this.router.navigate(['/login']);
        this.notifier.notify('error', data.message);
      }
    }).then(()=> {
      this.loading = false;
      this.spinner.hide();
    });
  }
}
