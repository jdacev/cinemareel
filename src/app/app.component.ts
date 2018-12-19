import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth-service';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
} )

export class AppComponent implements OnInit {

  constructor (
    private router: Router,
    private authService: AuthService) {
      
  }

  ngOnInit() {
    
  }

  logout() {
    this.authService.destroyCredentials();
    this.router.navigate(['/login']);
  }
}
