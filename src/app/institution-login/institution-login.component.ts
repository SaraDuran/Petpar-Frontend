import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InstitutionService } from '../services/institution.service';
import {NgOptimizedImage} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-institution-login',
  standalone: true,
    imports: [FormsModule, NgOptimizedImage, RouterLink, RouterLinkActive],
  templateUrl: './institution-login.component.html',
  styleUrls: ['./institution-login.component.css'],
})
export class InstitutionLoginComponent {
  email: string = '';
  password: string = '';

  constructor(private institutionService: InstitutionService) {}

  onSubmit() {
    const credentials = {
      email: this.email,
      password: this.password,
    };

    this.institutionService.loginInstitution(credentials).subscribe({
      next: (response) => {
        console.log('Login realizado com sucesso:', response);
        alert('Login bem-sucedido!');
      },
      error: (err) => {
        console.error('Erro ao fazer login:', err);
        alert('Erro ao fazer login. Verifique os dados e tente novamente.');
      },
    });
  }
}
