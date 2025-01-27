import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms'; // Importação do FormsModule

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [FormsModule], // Adicionado FormsModule na lista de imports
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent {
  email: string = '';
  password: string = '';

  constructor(private userService: UserService) {}

  onSubmit() {
    const credentials = {
      email: this.email,
      password: this.password,
    };

    this.userService.loginUser(credentials).subscribe({
      next: (response) => {
        console.log('Login realizado com sucesso:', response);
        alert('Login bem-sucedido!');
      },
      error: (err) => {
        console.error('Erro no login:', err);
        alert('Erro ao fazer login. Verifique os dados e tente novamente.');
      },
    });
  }
}
