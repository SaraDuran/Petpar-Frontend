import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // Importar HttpClient
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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadAnimals();
  }

  loadAnimals(): void {
    this.http.get<any[]>('http://localhost:8080/v1/animal/all').subscribe({
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
        this.filteredAnimals = data;
      },
      error: (err: any) => {
        console.error('Erro ao filtrar animais:', err);
      }
    });
  }



  requestAdoption(animalId: number): void {
    this.http.post(`http://localhost:8080/adoption`, { animalId }).subscribe({
      next: () => {
        alert('Pedido de adoção enviado com sucesso!');
      },
      error: (err: any) => { // Tipagem explícita
        console.error('Erro ao enviar o pedido de adoção:', err);
      }
    });
  }
}
