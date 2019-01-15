import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import {NgForm} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loading = false;
  notifier: NotifierService;

  constructor(
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  registrarme(f: NgForm){
    this.loading = true;
    this.spinner.show();

    this.authService.signup(
      f.value.emailreg, 
      f.value.firstName, 
      f.value.lastName, 
      f.value.password).then((data: any) => {

      if (data.errType == 0) {
        //this.alertService.success('El registro en Cinema Reel fue un éxito!', true);
        this.router.navigate(['/portal-home']);
      } else {
        //this.alertService.error('Se produjo un error en la registración '  + JSON.stringify(data));
        this.router.navigate(['/register']);
        this.notifier.notify('error', data.message);
      }
    }).then(()=> {
      this.loading = false;
      this.spinner.hide();
    });
  }

}
