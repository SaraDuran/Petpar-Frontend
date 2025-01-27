import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserLoginComponent } from './user-login/user-login.component';
import {UserRegisterComponent} from './user-register/user-register.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Rota principal
  { path: 'user-login', component: UserLoginComponent }, // Rota para o login
  { path: 'user-register', component: UserRegisterComponent }, // Rota para o cadastro
];
