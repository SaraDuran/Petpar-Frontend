import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http'; // Importar HttpClient
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  adoptionStatus = 'PENDING_ADOPTION';

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
    const params: any = {};

    if (this.filters.species) {
      params.species = this.filters.species.toUpperCase(); // Garante que está enviando corretamente
    }
    if (this.filters.startDate) {
      params.startDate = this.filters.startDate;
    }
    if (this.filters.endDate) {
      params.endDate = this.filters.endDate;
    }
    console.log("Enviando filtros:", params); // Log para verificar os valores
    this.http.get<any[]>('http://localhost:8080/v1/animal/filter', { params }).subscribe({
      next: (data: any[]) => {
        this.filteredAnimals = data.filter( animal => {
         const matchesAdoptionStatus = this.adoptionStatus
           ? animal.status_adoption === this.adoptionStatus
           : true;

         return matchesAdoptionStatus;
       });
      },
      error: (err: any) => {
        console.error('Erro ao filtrar animais:', err);
      }
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
        this.loadAnimals();
      },
      error: (err: any) => { // Tipagem explícita
        console.error('Erro ao enviar o pedido de adoção:', err);
      }
    });
  }

  goToAnimalProfile(animalId: string): void {
    if (animalId) {
      this.router.navigate([`/animal-user-profile/${animalId}`]);
    } else {
      console.error("Erro: ID do animal não encontrado.");
    }
  }

}
