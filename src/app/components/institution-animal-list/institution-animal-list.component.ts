import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http'; // Importar HttpClient
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from '../../services/animal.service';
import { NavbarInstitutionComponent } from '../navbar-institution/navbar-institution.component';

@Component({
  selector: 'app-institution-animal-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarInstitutionComponent],
  templateUrl: './institution-animal-list.component.html',
  styleUrls: ['./institution-animal-list.component.css']
})
export class InstitutionAnimalListComponent implements OnInit {
  animals: any[] = [];
  filteredAnimals: any[] = [];
  filters = {
    statusAdoption: '',
    species: '',
    startDate: '',
    endDate: ''
  };
  institutionId: number = 0;

  constructor(private animalService: AnimalService, private http: HttpClient,private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.institutionId = this.route.snapshot.params[`id`];
    this.loadAnimals();
  }

  loadAnimals(): void {
  let params = new HttpParams()
            .set('pageNumber', 0)
            .set('pageSize', 100);

    this.http.get<any[]>(`http://localhost:8080/v1/animal-list/${this.institutionId}`, { params }).subscribe({
      next: (data: any[]) => {
        console.log('Dados recebidos:', data);
        this.animals = data;
        this.filteredAnimals = data;
      },
      error: (err: any) => {
        console.error('Erro ao carregar os animais:', err);
      }
    });
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
      const matchesInstitution = this.institutionId
        ? animal.institutionId === this.institutionId
        : true;

      return matchesSpecies && matchesStartDate && matchesEndDate && matchesInstitution;
    });
  }

  editAnimal(animalId: string, id: string): void {
    if (!animalId || !id) {
      console.error("Erro: ID do animal ou da instituição está faltando.");
      return;
    }
  
    console.log(`Editando animal com ID: ${animalId}, Instituição: ${id}`);
    this.router.navigate([`/animal-institution-profile`, id], {
      queryParams: { animalId }
    });
  }

  deleteAnimal(id: string): void {
    if (id) {
      this.animalService.deleteAnimal(id).subscribe(() => {
        this.loadAnimals();
      });
    }
  }

  approveAdoption(animalId: number) {
    if (confirm("Tem certeza que deseja aprovar esta adoção?")) {
      this.animalService.approveAdoption(animalId).subscribe({
        next: () => {
          alert("Adoção aprovada com sucesso!");
          const animalIndex = this.animals.findIndex(a => a.id === animalId);
          if (animalIndex !== -1) {
            this.animals[animalIndex].status = 'adotado';
          }
        },
        error: (err) => {
          console.error("Erro ao aprovar adoção:", err);
          alert("Erro ao aprovar adoção. Tente novamente.");
        }
      });
    }
  }

  reproveAdoption(animalId: number) {
      if (confirm("Tem certeza que deseja reprovar esta adoção?")) {
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
