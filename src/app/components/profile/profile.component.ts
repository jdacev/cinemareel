import { Component, OnInit } from '@angular/core';
import {NgForm, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ProfileService } from '../../services/profile.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  notifier: NotifierService;
  loading = false;
  user: User = new User();

  constructor(
    private router: Router,
    notifierService: NotifierService,
    private profileService: ProfileService,
    private spinner: NgxSpinnerService,
  ) {
    this.notifier = notifierService;
    this.getProfile();
   }

  ngOnInit() {
    
  }

  getProfile(){
    this.loading = true;
    this.spinner.show();

    this.profileService.getProfile().then((data: any) => {
      if (data.errType == 0) {
        this.user = new User().deserialize(data.user);
      } else {
        if(data.message!=undefined){
          this.notifier.notify('default', data.message);
        }
      }
    }).then(()=> {
      this.loading = false;
      this.spinner.hide();
    });
  }

  updateProfile(f: NgForm){
    this.loading = true;
    this.spinner.show();

    let user = new User().deserialize(f.value);
    this.profileService.updateProfile(user).then((data: any) => {
      
      if(data.errType==0){
        this.router.navigate(['/portal-home']);
      if(data.message!=undefined){
          this.notifier.notify('default', data.message);
        }
      }
    }).then(()=>{
      this.loading = false;
      this.spinner.hide();
    })
  }

}
