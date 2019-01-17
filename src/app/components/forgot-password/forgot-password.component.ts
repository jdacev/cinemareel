import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { AuthService } from '../../services/auth-service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  notifier: NotifierService;
  loading: boolean = false;
  authorizeChangePassword: boolean = false;
  email_t: NgForm;

  constructor(
    private router: Router,
    notifierService: NotifierService,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {
    this.notifier = notifierService;
   }

  ngOnInit() {
  }

  stepOne(f: NgForm){
    if(f.value.email=='') {
      this.notifier.notify('default', 'El correo electrónico es requerido para continuar');
    } else {
      this.loading = true;
      this.spinner.show();
      
      this.authService.securityCode(f.value.email)
        .then((data: any) => {
          this.notifier.notify('default', data.message);
          this.loading = false;
          this.spinner.hide();
      });
    }
  }


  stepTwo(f: NgForm){
    if(f.value.email=='') {
      this.notifier.notify('default', 'El correo electrónico es requerido para continuar');
      return;
    }
    if(f.value.securityCode=='') {
      this.notifier.notify('default', 'El código de seguridad es requerido para continuar');
      return;
    } 
      
    this.loading = true;
    this.spinner.show();
      
    this.authService.verifySecurityCode(f.value.email, f.value.securityCode)
      .then( (data: any) => {

        if(data.errType==0){
          this.authorizeChangePassword = true;
          this.email_t = f.value.email;
        } else {
          console.log(data.message);
          this.notifier.notify('default', data.message);
        }
        this.loading = false;
        this.spinner.hide();
    });
  }


  stepThree(f: NgForm){
    if(f.value.password1=='') {
      this.notifier.notify('default', 'Ingrese la nueva contraseña para continuar');
      return;
    }
    if(f.value.password2=='') {
      this.notifier.notify('default', 'Repita la nueva contraseña para continuar');
      return;
    }

    if(f.value.password1!=f.value.password2) {
      this.notifier.notify('default', 'Las nuevas contraseñas no coinciden');
      return;
    }
      
    this.loading = true;
    this.spinner.show();
      
    this.authService.restorePassword(this.email_t, f.value.password2)
      .then( (data: any) => {

        if(data.errType==0){
          this.notifier.notify('default', data.message);
          this.router.navigate(['/login']);
        } else {
          this.notifier.notify('default', data.message);
        }
        this.loading = false;
        this.spinner.hide();
    });
  }
}
