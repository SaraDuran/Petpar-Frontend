import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from '../../services/animal.service';
import { NavbarInstitutionComponent } from '../navbar-institution/navbar-institution.component';

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
    institution_id: '',
    birthDate: '',
    gender: '',
    status_adoption: 'PENDING_ADOPTION',
    description: '',
    name: ''
  };

  photo: File | null = null;
  photoUrl: string | null = null;

  constructor(private animalService: AnimalService, private route: ActivatedRoute, private router: Router) {}

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.photo = file;
      this.photoUrl = URL.createObjectURL(file);
    }
  }

  onSubmit() {
    this.animal.institution_id = this.route.snapshot.params['id'];

    const formData = new FormData();
    formData.append('name', this.animal.name);
    formData.append('description', this.animal.description);
    formData.append('birthDate', this.animal.birthDate);
    formData.append('type', this.animal.type);
    formData.append('gender', this.animal.gender);
    formData.append('status_adoption', this.animal.status_adoption);
    formData.append('institution_id', this.animal.institution_id);
    
    if (this.photo) {
      formData.append('photo', this.photo);
    }

    this.animalService.registerAnimal(formData).subscribe({
      next: (response: any) => {
        console.log('Animal registrado com sucesso:', response);
        alert('Cadastro realizado com sucesso!');
        this.router.navigate(['/institution-animal-list', this.animal.institution_id]);
      },
      error: (err: any) => {
        console.error('Erro ao registrar animal:', err);
        alert('Erro ao cadastrar. Tente novamente.');
      }
    });
  }
}