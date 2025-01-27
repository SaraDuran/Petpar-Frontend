import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-user-login',
  standalone: true,
  templateUrl: './user-login.component.html',
  imports: [
    FormsModule,
    RouterLink,
    NgOptimizedImage
  ],
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  email: string = '';
  password: string = '';

  onSubmit() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    // Adicione aqui a lógica para autenticação
  }
}
