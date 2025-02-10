import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AnimalService } from '../../services/animal.service';
import {NgOptimizedImage} from '@angular/common';


@Component({
  selector: 'app-animal-institution-register',
  templateUrl: './animal-institution-register.component.html',
  styleUrls: ['./animal-institution-register.component.css'],
  imports: [RouterLink, NgOptimizedImage]
})
export class AnimalInstitutionRegisterComponent {
  animalData: any = {
    species: '',
    name: '',
    gender: '',
    birthDate: '',
    adopter: '',
    institution: ''
  };

  constructor(private animalService: AnimalService, private router: Router) {}

  registerAnimal() {
    if (this.animalData.species && this.animalData.name && this.animalData.adopter) {
      this.animalService.registerAnimal(this.animalData).subscribe(
        (response) => {
          console.log('Animal registrado com sucesso!', response);
          this.router.navigate(['/animal-list']);
        },
        (error) => {
          console.error('Erro ao registrar animal', error);
        }
      );
    } else {
      console.error('Dados incompletos para registrar animal.');
    }
  }
}
