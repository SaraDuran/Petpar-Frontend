import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'
import { RouterLink } from '@angular/router';
import { InstitutionService } from '../../services/institution.service';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-institution-register',
  standalone: true,
  imports: [FormsModule, RouterLink, NgOptimizedImage],
  templateUrl: './institution-register.component.html',
  styleUrls: ['./institution-register.component.css'],
})
export class InstitutionRegisterComponent {
  name: string = '';
  description: string = '';
  email: string = '';
  password: string = '';
  cpfCnpj: string = '';
  phoneNumber: string = '';

  constructor(private institutionService: InstitutionService, private router: Router) {}

  onSubmit() {
    const institutionData = {
      name: this.name,
      description: this.description,
      email: this.email,
      password: this.password,
      cpfOrCnpj: this.cpfCnpj,
      phoneNumber: this.phoneNumber,
    };

    this.institutionService.registerInstitution(institutionData).subscribe({
      next: (response) => {
        console.log('Instituição registrada com sucesso:', response);
        alert('Cadastro realizado com sucesso!');
        this.router.navigateByUrl('/institution-login');
      },
      error: (err) => {
        console.error('Erro ao registrar instituição:', err);
        alert('Erro ao cadastrar. Verifique os dados e tente novamente.');
      },
    });
  }
}
