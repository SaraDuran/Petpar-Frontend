import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router'
import {RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-register',
  standalone: true,
  templateUrl: './user-register.component.html',
  imports: [
    FormsModule,
    RouterLink,
    NgOptimizedImage
  ],
  styleUrls: ['./user-register.component.css']
})

export class UserRegisterComponent {
  // Propriedades para os dados do formulário
  name: string = '';
  email: string = '';
  password: string = '';
  birthDate: string = '';
  cpf: string = '';
  phoneNumber: string = '';
  //gender: string = ''
  gender: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
      birthDate: this.birthDate || '2000-01-01', // Exemplo de data padrão
      active: true,
      cpf: this.cpf,
      phoneNumber: this.phoneNumber,
      gender: this.gender,
    };

    this.userService.registerUser(userData).subscribe({
      next: (response) => {
        console.log('Usuário registrado com sucesso:', response);
        alert('Cadastro realizado com sucesso!');
        this.router.navigateByUrl('/user-login');
      },
      error: (err) => {
        console.error('Erro ao registrar usuário:', err);
        alert('Erro ao cadastrar. Tente novamente.');
      },
    });
  }
}
