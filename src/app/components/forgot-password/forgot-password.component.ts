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
  loading = false;

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
      this.notifier.notify('info', 'Hay que completar el correo electrónico para continuar');
    } else {
      this.loading = true;
      this.spinner.show();
      
      this.authService.securityCode(f.value.email)
        .then((data: any) => {
          this.notifier.notify('info', data.message);
          this.loading = false;
          this.spinner.hide();
      });
    }
  }


  stepTwo(f: NgForm){
    if(f.value.email=='') {
      this.notifier.notify('warning', 'Funcionalidad en desarrollo. Aun no disponible.');
    } else {

    }
  }

}
