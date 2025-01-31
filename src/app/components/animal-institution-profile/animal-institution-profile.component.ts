import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AnimalService } from '../../services/animal.service';

@Component({
  selector: 'app-animal-institution-profile',
  standalone: true,
  templateUrl: './animal-institution-profile.component.html',
  imports: [
    FormsModule,
    RouterLink,
    HttpClientModule,
    CommonModule
  ],
  styleUrls: ['./animal-institution-profile.component.css']
})
export class AnimalInstitutionProfileComponent {
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