import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { InstitutionLoginComponent } from './institution-login/institution-login.component';
import { InstitutionRegisterComponent } from './institution-register/institution-register.component';
/*
import { AnimalInstitutionProfileComponent } from './animal-institution-profile/animal-institution-profile.component';
import { AnimalInstitutionRegisterComponent } from './animal-institution-register/animal-institution-register.component';
import { AnimalUserProfileComponent } from './animal-user-profile/animal-user-profile.component';
import { ContatoComponent } from './contato/contato.component';
import { DonationInstitutionListComponent } from './donation-institution-list/donation-institution-list.component';
import { DonationUserListComponent } from './donation-user-list/donation-user-list.component';
import { DonationUserRegisterComponent } from './donation-user-register/donation-user-register.component';
import { InstitutionAnimalListComponent } from './institution-animal-list/institution-animal-list.component';
import { InstitutionAnimalRegisterComponent } from './institution-animal-register/institution-animal-register.component';
import { UserAnimalListComponent } from './user-animal-list/user-animal-list.component';
*/

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user-login', component: UserLoginComponent },
  { path: 'user-register', component: UserRegisterComponent },
  { path: 'institution-login', component: InstitutionLoginComponent },
  { path: 'institution-register', component: InstitutionRegisterComponent },
  /*
  { path: 'animal-institution-profile', component: AnimalInstitutionProfileComponent },
  { path: 'animal-institution-register', component: AnimalInstitutionRegisterComponent },
  { path: 'animal-user-profile', component: AnimalUserProfileComponent },
  { path: 'contato', component: ContatoComponent },
  { path: 'donation-institution-list', component: DonationInstitutionListComponent },
  { path: 'donation-user-list', component: DonationUserListComponent },
  { path: 'donation-user-register', component: DonationUserRegisterComponent },
  { path: 'institution-animal-list', component: InstitutionAnimalListComponent },
  { path: 'institution-animal-register', component: InstitutionAnimalRegisterComponent },
  { path: 'user-animal-list', component: UserAnimalListComponent },*/
];
