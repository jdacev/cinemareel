import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { NotifierService } from 'angular-notifier';
import { AuthService } from '../services/auth-service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  notifier: NotifierService;
  public url:string = null;
  public currentUser:string;
  headers = new Headers();

  constructor (
    private http: Http,
    notifierService: NotifierService,
    private authService: AuthService
    ) {
      this.url = environment.url;
      this.notifier = notifierService;
      this.currentUser = authService.currentUser;

      this.headers.append('Content-Type', 'application/json');
      this.headers.append('Authorization', JSON.parse(this.currentUser).token);
  }
  
   getProfile(){

    let currentUser:any = JSON.parse(localStorage.getItem('currentUser'));
    return new Promise(resolve => {
      this.http.get(this.url + 'profile/' + currentUser.user._id, {headers: this.headers}).subscribe(response => {
          
        var data = response.json();
        resolve( { errType: data.errType, user: data.user } );
            
      }, error => {
        this.notifier.notify( 'error', error.json().message);
        resolve(false);
      });
    });
  }

  updateProfile(user: User){
    return new Promise(resolve => {
      this.http.put(this.url + 'profile/profile', user, {headers: this.headers}).subscribe(response => {
          
          var data = response.json();
          resolve( {errType:data.errType, message:data.message} );
      }, error => {
        this.notifier.notify( 'error', error.json().message);
        resolve(false);
      });
    });
  }
}
