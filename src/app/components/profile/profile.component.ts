import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  notifier: NotifierService;

  constructor(
    private router: Router,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
   }

  ngOnInit() {

  }

  saveData(f: NgForm){
    this.notifier.notify('success', 'Datos personales actualizados');
    this.router.navigate(['/portal-home']);
  }

}
