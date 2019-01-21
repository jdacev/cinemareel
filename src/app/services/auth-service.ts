import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { EmailValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  notifier: NotifierService;
  public url:string = null;
  public returnUrl:string;
  isLoggedIn: boolean;
  AuthUser;
  public currentUser:string;

  constructor (
    private http: Http,
    private router: Router,
    notifierService: NotifierService
    ) {
      
    this.url = environment.url;
    this.isLoggedIn = false;
    this.currentUser = localStorage.getItem('currentUser');
    this.notifier = notifierService;
  }

  storeUserCredentials(User) {
    localStorage.setItem('currentUser', JSON.stringify(User));
    this.useCredentials(User);
  }

  destroyCredentials(){
    localStorage.removeItem('currentUser');
    this.currentUser=null;
    this.isLoggedIn=false;
  }

  loadUserCredentials() {
    var token = window.localStorage.getItem('currentUser');
    this.useCredentials(JSON.parse(token));
  }

  useCredentials(User) {
    if(User) {
      this.isLoggedIn = true;
      this.AuthUser = User;
      this.currentUser = localStorage.getItem('currentUser');
    } else { 
      this.isLoggedIn = false;
      this.AuthUser = null;
    }
  }

  signup(emailreg, firstName, lastName, password) {

    var regData = {
      email: emailreg,
      firstName: firstName,
      lastName: lastName,
      password: password
    }
    
    return new Promise(resolve => {
      this.http.post(this.url + 'signup', regData).subscribe(response => {
          
          var data = response.json();
          resolve( {errType:data.errType, message:data.message} );
          if(data.errType == 0){
            this.storeUserCredentials(data);
          }
            this.router.navigateByUrl(this.returnUrl);
            
      }, error => {
        this.notifier.notify( 'error', error.json().message);
        resolve(false);
      });
    });
  }

  login(email, password) {

      var creds = {
        email: email,
        password: password
      }
      
      return new Promise(resolve => {
        this.http.post(this.url + 'login', creds).subscribe(response => {
            
            var data = response.json();
            resolve( {errType:data.errType,message:data.message} );
            if(data.errType == 0){
              this.storeUserCredentials(data);
            }
              this.router.navigateByUrl(this.returnUrl);
              
        }, error => {
          this.notifier.notify( 'error', error.json().message);
          resolve(false);
        });
      });
    }

    securityCode(email) {

      var creds = {
        email: email
      }
      
      return new Promise(resolve => {
        this.http.post(this.url + 'util/securitycode', creds).subscribe(response => {
            
          var data = response.json();
          resolve( {errType:data.errType, message:data.message} );
          //this.router.navigateByUrl(this.returnUrl);
              
        }, error => {
          this.notifier.notify( 'error', error.json().message);
          resolve(false);
        });
      });
    }

    verifySecurityCode(email, securityCode) {

      var creds = {
        email: email,
        securityCode: securityCode
      }
      
      return new Promise(resolve => {
        this.http.post(this.url + 'util/verifysecuritycode', creds).subscribe(response => {
            
          var data = response.json();
          resolve( {errType:data.errType, message:data.message} );
              
        }, error => {
          this.notifier.notify( 'error', error.json().message);
          resolve(false);
        });
      });
    }

    restorePassword(email, password) {

      var creds = {
        email: email,
        password: password
      }
      
      return new Promise(resolve => {
        this.http.post(this.url + 'util/restorepassword', creds).subscribe(response => {
            
          var data = response.json();
          resolve( {errType:data.errType, message:data.message} );
              
        }, error => {
          this.notifier.notify( 'error', error.json().message);
          resolve(false);
        });
      });
    }
}
