import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimalService } from '../../services/animal.service';
import { NavbarComponent } from '../navbar-usuario/navbar.component';

@Component({
  selector: 'app-animal-user-profile',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './animal-user-profile.component.html',
  styleUrls: ['./animal-user-profile.component.css']
})
export class AnimalUserProfileComponent implements OnInit {
  animal: any = {};
  isLoading = true;
  errorMessage = '';

  constructor(private location: Location, private animalService: AnimalService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadAnimal();
  }

  private loadAnimal(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    
    this.animalService.getAnimal(id).subscribe({
      next: (data) => this.animal = data,
      error: () => this.errorMessage = 'Erro ao carregar informações do animal'
    });
  }

  goBack(): void {
    this.location.back();
  }
}