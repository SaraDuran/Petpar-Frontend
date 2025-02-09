import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http'; // Importar HttpClient
import { NavbarComponent } from '../navbar-usuario/navbar.component';

@Component({
  selector: 'app-user-animal-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './user-animal-list.component.html',
  styleUrls: ['./user-animal-list.component.css']
})
export class UserAnimalListComponent implements OnInit {
  animals: any[] = [];
  filteredAnimals: any[] = [];
  filters = {
    species: '',
    startDate: '',
    endDate: ''
  };
  adoptionStatus = 'IN_PROGRESS';

  userId: number = 0;

  constructor(private http: HttpClient,private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params[`id`];
    this.loadAnimals();
  }

  loadAnimals(): void {
    this.http.get<any[]>('http://localhost:8080/v1/animal/all').subscribe({
      next: (data: any[]) => {
        console.log('Dados recebidos:', data);
        this.animals = data.filter( animal => {
          const matchesAdoptionStatus = this.adoptionStatus
            ? animal.status_adoption === this.adoptionStatus
            : true;

          return matchesAdoptionStatus;
        });
        this.filteredAnimals = this.animals;
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
      const matchesAdoptionStatus = this.adoptionStatus
        ? animal.status_adoption === this.adoptionStatus
        : true;

      return matchesSpecies && matchesStartDate && matchesEndDate && matchesAdoptionStatus;
    });
  }

  requestAdoption(animalId: number): void {
  let params = new HttpParams()
              .set('status', 'IN_PROGRESS')
              .set('userId', this.userId)
              .set('animalId', animalId);

  this.http.put<any>(`http://localhost:8080/v1/adoption`,null, { params }).subscribe({
      next: () => {
        alert('Pedido de adoção enviado com sucesso!');
      },
      error: (err: any) => { // Tipagem explícita
        console.error('Erro ao enviar o pedido de adoção:', err);
      }
    });
  }
}
