import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AnimalService } from '../../services/animal.service';

@Component({
  selector: 'app-user-animal-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
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

  constructor(private animalService: AnimalService) { }

  ngOnInit(): void {
    this.loadAnimals();
  }

  loadAnimals(): void {
    this.animalService.getAvailableAnimals().subscribe((data: any[]) => {
      this.animals = data;
      this.filteredAnimals = data;
    });
  }

  filterAnimals(): void {
    this.filteredAnimals = this.animals.filter(animal => {
      return (!this.filters.species || animal.species === this.filters.species) &&
             (!this.filters.startDate || new Date(animal.birthDate) >= new Date(this.filters.startDate)) &&
             (!this.filters.endDate || new Date(animal.birthDate) <= new Date(this.filters.endDate));
    });
  }

  requestAdoption(id: string): void {
    if (id) {
      this.animalService.requestAdoption(id).subscribe(() => {
        alert('Solicitação de adoção enviada com sucesso!');
        this.loadAnimals();
      });
    }
  }
}