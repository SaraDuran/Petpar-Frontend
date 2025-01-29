import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InstitutionService } from '../services/institution.service';

@Component({
  selector: 'app-institution-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
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

  constructor(private institutionService: InstitutionService) {}

  onSubmit() {
    const institutionData = {
      name: this.name,
      description: this.description,
      email: this.email,
      password: this.password,
      cpfCnpj: this.cpfCnpj,
      phoneNumber: this.phoneNumber,
    };

    this.institutionService.registerInstitution(institutionData).subscribe({
      next: (response) => {
        console.log('Instituição registrada com sucesso:', response);
        alert('Cadastro realizado com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao registrar instituição:', err);
        alert('Erro ao cadastrar. Verifique os dados e tente novamente.');
      },
    });
  }
}
