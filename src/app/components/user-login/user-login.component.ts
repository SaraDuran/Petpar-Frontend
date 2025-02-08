import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { FormsModule } from '@angular/forms'; // Importação do FormsModule
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [FormsModule, RouterLink, NgOptimizedImage],
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent {
  email: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.loginUser(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login realizado com sucesso:', response);
        alert('Login bem-sucedido!');
        this.router.navigateByUrl('/user-animal-list');
      },
      error: (err) => {
        console.error('Erro no login:', err);
        alert('Erro ao fazer login. Verifique os dados e tente novamente.');
      },
    });
  }
}
