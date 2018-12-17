import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  
  //{ path: 'login', component: LoginComponent},
  { path: 'portal-home', component: HomeComponent},
  { path: '**', component:AppComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
