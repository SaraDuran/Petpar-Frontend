import { Component } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
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
    type: '',
    name: '',
    gender: '',
    birthDate: '',
//     user_id: '',
    institution_id: ''
  };

  constructor(private animalService: AnimalService,private route: ActivatedRoute, private router: Router) {}

  registerAnimal() {

    if (this.animalData.type && this.animalData.name) {
      this.animalService.registerAnimal(this.animalData).subscribe(
        (response) => {
          console.log('Animal registrado com sucesso!', response);
          this.router.navigate(['/institution-animal-list', response.id]);
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
