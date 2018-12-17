import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly notifier: NotifierService;
  public url:string = null;
  public returnUrl:string;
  isLoggedIn: boolean;
  AuthUser;
  public user:string;

  constructor (
    private http: Http,
    private router: Router
    ) {
      
    this.url = environment.url;
    this.isLoggedIn = false;
    this.user = localStorage.getItem('currentUser');
  }

  storeUserCredentials(User) {
    localStorage.setItem('currentUser', JSON.stringify(User));
    this.useCredentials(User);
  }

  destroyCredentials(){
    localStorage.removeItem('currentUser');
    this.user=null;
  }

  useCredentials(User) {
    if(User) {
      this.isLoggedIn = true;
      this.AuthUser = User;
      this.user = localStorage.getItem('currentUser');
    } else { 
      this.isLoggedIn = false;
      this.AuthUser = null;
    }
  }

  login(username, password) {

      var creds = {
        username: username,
        password: password
      }
      
      return new Promise(resolve => {
        this.http.post(this.url + 'login', creds).subscribe(response => {
            
            console.log(response.json());
            var data = response.json();
            resolve({errType:data.errType,message:data.message});
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
}
