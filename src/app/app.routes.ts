import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { InstitutionLoginComponent } from './components/institution-login/institution-login.component';
import { InstitutionRegisterComponent } from './components/institution-register/institution-register.component';
import { AnimalInstitutionProfileComponent } from './components/animal-institution-profile/animal-institution-profile.component';
import { AnimalInstitutionRegisterComponent } from './components/animal-institution-register/animal-institution-register.component';
import { AnimalUserProfileComponent } from './components/animal-user-profile/animal-user-profile.component';
import { ContatoComponent } from './components/contato/contato.component';
import { DonationInstitutionListComponent } from './components/donation-institution-list/donation-institution-list.component';
import { DonationUserListComponent } from './components/donation-user-list/donation-user-list.component';
import { DonationUserRegisterComponent } from './components/donation-user-register/donation-user-register.component';
import { InstitutionAnimalListComponent } from './components/institution-animal-list/institution-animal-list.component';
import { InstitutionAnimalRegisterComponent } from './components/institution-animal-register/institution-animal-register.component';
import { UserAnimalListComponent } from './components/user-animal-list/user-animal-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user-login', component: UserLoginComponent },
  { path: 'user-register', component: UserRegisterComponent },
  { path: 'institution-login', component: InstitutionLoginComponent },
  { path: 'institution-register', component: InstitutionRegisterComponent },
  { path: 'animal-institution-profile', component: AnimalInstitutionProfileComponent },
  { path: 'animal-institution-register', component: AnimalInstitutionRegisterComponent },
  { path: 'animal-user-profile', component: AnimalUserProfileComponent },
  { path: 'contato', component: ContatoComponent },
  { path: 'donation-institution-list', component: DonationInstitutionListComponent },
  { path: 'donation-user-list', component: DonationUserListComponent },
  { path: 'donation-user-register', component: DonationUserRegisterComponent },
  { path: 'institution-animal-list/:id?', component: InstitutionAnimalListComponent },
  { path: 'institution-animal-register', component: InstitutionAnimalRegisterComponent },
  { path: 'user-animal-list', component: UserAnimalListComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutesModule { }
