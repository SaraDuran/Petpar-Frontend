import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from '../../services/animal.service';
import {NavbarInstitutionComponent} from '../navbar-institution/navbar-institution.component';

@Component({
  selector: 'app-institution-animal-register',
  standalone: true,
  templateUrl: './institution-animal-register.component.html',
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule,
    NavbarInstitutionComponent
  ],
  styleUrls: ['./institution-animal-register.component.css']
})
export class InstitutionAnimalRegisterComponent {
  animal = {
    type: '',
    id: '',
//     user: { id: '' },
    institution_id: '' ,
    birthDate: '',
    gender: '',
    statusAdoption: '',
    description: '',
    name: ''
  };

  photo: File | null = null;
  photoUrl: string | null = null;

  constructor(private animalService: AnimalService,private route: ActivatedRoute,private router: Router) {}

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.photo = file;
      this.photoUrl = URL.createObjectURL(file);
    }
  }

  onSubmit() {
  this.animal.institution_id= this.route.snapshot.params[`id`];
    const animalData = {
      ...this.animal,
      photo: this.photo
    };

    this.animalService.registerAnimal(this.animal).subscribe({
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
