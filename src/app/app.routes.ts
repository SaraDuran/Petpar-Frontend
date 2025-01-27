import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { InstitutionLoginComponent } from './institution-login/institution-login.component';
import { InstitutionRegisterComponent } from './institution-register/institution-register.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Página inicial
  { path: 'user-login', component: UserLoginComponent }, // Login de usuário
  { path: 'user-register', component: UserRegisterComponent }, // Cadastro de usuário
  { path: 'institution-login', component: InstitutionLoginComponent }, // Login de instituição
  { path: 'institution-register', component: InstitutionRegisterComponent }, // Cadastro de instituição
];
