import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {
    
  }

  /**
   * metodo temporal para cuando se ingresa mobile y no anda el menu
   */
  logout() {
    this.authService.destroyCredentials();
    this.router.navigate(['/login']);
  }
}
