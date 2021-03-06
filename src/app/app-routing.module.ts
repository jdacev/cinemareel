import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard} from './commons/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';


const routes: Routes = [
  
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'portal-home', canActivate:[AuthGuard], component: HomeComponent},
  { path: 'profile', canActivate:[AuthGuard], component: ProfileComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: '**', component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
