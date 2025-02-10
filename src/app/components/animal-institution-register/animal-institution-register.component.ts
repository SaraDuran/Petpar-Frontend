import { Component } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AnimalService } from '../../services/animal.service';

@Component({
  selector: 'app-animal-institution-register',
  templateUrl: './animal-institution-register.component.html',
  styleUrls: ['./animal-institution-register.component.css'],
  imports: [RouterLink]
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

  constructor(private animalService: AnimalService,private route: ActivatedRoute, private router: Router) {}

  registerAnimal() {
    this.animalData.institution= this.route.snapshot.params[`id`];
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
