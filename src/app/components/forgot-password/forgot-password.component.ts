import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

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
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
   }

  ngOnInit() {
  }

  stepOne(f: NgForm){
    if(f.value.email=='') {
      this.notifier.notify('info', 'Hay que completar el correo electrónico para continuar');
    } else {
      //TODO: llamar al servicio que envía el código de seguridad
      //this.router.navigate(['/portal-home']);
    }
  }


  stepTwo(f: NgForm){
    if(f.value.email=='') {
      this.notifier.notify('warning', 'Funcionalidad en desarrollo. Aun no disponible.');
    } else {
      this.notifier.notify('warning', 'Funcionalidad en desarrollo. Aun no disponible.');
      //this.router.navigate(['/portal-home']);
    }
  }

}
