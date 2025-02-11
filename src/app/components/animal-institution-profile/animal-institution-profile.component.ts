import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AnimalService } from '../../services/animal.service';
import { NavbarInstitutionComponent } from '../navbar-institution/navbar-institution.component';

@Component({
  selector: 'app-animal-institution-profile',
  standalone: true,
  templateUrl: './animal-institution-profile.component.html',
  imports: [
    FormsModule,
    RouterLink,
    HttpClientModule,
    CommonModule,
    NavbarInstitutionComponent
  ],
  styleUrls: ['./animal-institution-profile.component.css']
})
export class AnimalInstitutionProfileComponent implements OnInit {
  animal: any = {
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

  institutionId!: string;
  animalId!: string;
  photo: File | null = null;
  photoUrl: string | null = null;

  constructor(
    private animalService: AnimalService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.institutionId = params['id'];
    });

    this.route.queryParams.subscribe(queryParams => {
      this.animalId = queryParams['animalId'];

      if (this.animalId) {
        this.getAnimal(this.animalId);
      } else {
        console.error("Erro: ID do animal não encontrado na URL.");
      }
    });
  }

  getAnimal(id: string): void {
    if (!id) {
      console.error("Erro: ID do animal não foi informado.");
      return;
    }

    this.animalService.getAnimal(id).subscribe({
      next: (data) => {
        this.animal = data;
        console.log("Animal carregado com sucesso:", data);
      },
      error: (err) => {
        console.error("Erro ao buscar animal:", err);
      }
    });
  }

  editAnimal(animalId: string, institutionId: string): void {
    if (!animalId || !institutionId) {
      console.error("Erro: ID do animal ou da instituição está faltando.");
      return;
    }

    console.log(`Editando animal com ID: ${animalId}, Instituição: ${institutionId}`);

    this.router.navigate([`/animal-institution-profile/${this.institutionId}`], {
      queryParams: { animalId }
    });
  }

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.photo = file;
      this.photoUrl = URL.createObjectURL(file);
    }
  }

  onSubmit(): void {
    const animalData = {
      ...this.animal,
      photo: this.photo
    };

    this.animalService.registerAnimal(animalData).subscribe({
      next: (response: any) => {
        console.log('Animal registrado com sucesso:', response);
        alert('Cadastro realizado com sucesso!');
        this.router.navigate(['/institution-animal-list', this.institutionId]);
      },
      error: (err: any) => {
        console.error('Erro ao registrar animal:', err);
        alert('Erro ao cadastrar. Tente novamente.');
      },
    });
  }
}
