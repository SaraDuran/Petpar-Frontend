import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AnimalService } from '../../services/animal.service';
import {NavbarInstitutionComponent} from '../navbar-institution/navbar-institution.component'; // Ajuste o caminho conforme a estrutura de sua aplicação

@Component({
  selector: 'app-institution-animal-register',
  standalone: true,
  templateUrl: './institution-animal-register.component.html',  // Coloque o caminho correto para o HTML
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule,
    NavbarInstitutionComponent
  ],
  styleUrls: ['./institution-animal-register.component.css']  // Coloque o caminho correto para o CSS
})
export class InstitutionAnimalRegisterComponent {
  animal = {
    type: '',
    id: '',
    user: { id: '' },
    institution: { id: '' },
    birthDate: '',
    gender: '',
    statusAdoption: '',
    description: '',
    name: ''
  };

  photo: File | null = null;
  photoUrl: string | null = null;

  constructor(private animalService: AnimalService) {}

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.photo = file;
      this.photoUrl = URL.createObjectURL(file);
    }
  }

  onSubmit() {
    const animalData = {
      ...this.animal,
      photo: this.photo
    };

    this.animalService.registerAnimal(animalData).subscribe({
      next: (response: any) => {
        console.log('Animal registrado com sucesso:', response);
        alert('Cadastro realizado com sucesso!');
      },
      error: (err: any) => {
        console.error('Erro ao registrar animal:', err);
        alert('Erro ao cadastrar. Tente novamente.');
      },
    });
  }
}
