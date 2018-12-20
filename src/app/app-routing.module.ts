import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard} from './commons/auth.guard';


const routes: Routes = [
  
  { path: 'login', component: LoginComponent},
  { path: 'portal-home', canActivate:[AuthGuard], component: HomeComponent},
  { path: '**', component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
