import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http'; // Importar HttpClient
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from '../../services/animal.service';
import { NavbarComponent } from '../navbar-usuario/navbar.component';

@Component({
  selector: 'app-user-animal-adopt-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './user-animal-adopt-list.component.html',
  styleUrls: ['./user-animal-adopt-list.component.css']
})
export class UserAnimalAdoptListComponent implements OnInit {
  animals: any[] = [];
  filteredAnimals: any[] = [];
  filters = {
    species: '',
    startDate: '',
    endDate: ''
  };

  userId: number = 0;
  adoptionStatus = 'IN_PROGRESS';

  constructor(private animalService: AnimalService, private http: HttpClient,private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params[`id`];
    this.loadAnimals();
  }

  filterAnimals(): void {
      this.filteredAnimals = this.animals.filter(animal => {
        const matchesSpecies = this.filters.species
          ? animal.species === this.filters.species
          : true;
        const matchesStartDate = this.filters.startDate
          ? new Date(animal.birthDate) >= new Date(this.filters.startDate)
          : true;
        const matchesEndDate = this.filters.endDate
          ? new Date(animal.birthDate) <= new Date(this.filters.endDate)
          : true;
        const matchesInstitution = this.userId
          ? animal.userId === this.userId
          : true;

        return matchesSpecies && matchesStartDate && matchesEndDate && matchesInstitution;
      });
    }

  loadAnimals(): void {
      this.http.get<any[]>('http://localhost:8080/v1/animal/all').subscribe({
        next: (data: any[]) => {
          console.log('Dados recebidos:', data);
          this.animals = data.filter( animal => {
             const matchesAdoptionStatus = this.adoptionStatus
              ? animal.status_adoption === this.adoptionStatus
              : true;
            const matchesUser = this.userId
              ? animal.userId === this.userId
              : true;

            return matchesAdoptionStatus && matchesUser;
          });
          this.filteredAnimals = this.animals;
        },
        error: (err: any) => {
          console.error('Erro ao carregar os animais:', err);
        }
      });
    }

  editAnimal(id: string): void {
    console.log('Editando animal com ID:', id);
  }

  reproveAdoption(animalId: number) {
      if (confirm("Tem certeza que deseja aprovar esta adoção?")) {
        this.animalService.reproveAdoption(animalId).subscribe({
          next: () => {
            alert("Adoção reprovada com sucesso!");
            this.loadAnimals();
          },
          error: (err) => {
            console.error("Erro ao reprovar adoção:", err);
            alert("Erro ao reprovar adoção. Tente novamente.");
          }
        });
      }
    }
}
