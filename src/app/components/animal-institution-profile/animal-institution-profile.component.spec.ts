import { Component } from '@angular/core';
import { AnimalService } from '../../services/animal.service';

@Component({
  selector: 'app-animal-institution-profile',
  templateUrl: './animal-institution-profile.component.html',
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
    statusAdoption: ''
  };

  photo: File | null = null; 

  constructor(private animalService: AnimalService) {} 

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.photo = file;
      console.log('Foto selecionada:', file);
    }
  }

  onSubmit() {
    const animalData = {
      type: this.animal.type,
      id: this.animal.id,
      user: this.animal.user,
      institution: this.animal.institution,
      birthDate: this.animal.birthDate,
      gender: this.animal.gender,
      statusAdoption: this.animal.statusAdoption,
      photo: this.photo
    };

    // Chama o método registerAnimal do AnimalService
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
