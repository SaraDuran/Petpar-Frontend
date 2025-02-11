import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AnimalService } from '../../services/animal.service';
import { NavbarComponent } from '../navbar-usuario/navbar.component';

@Component({
  selector: 'app-animal-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './animal-user-profile.component.html',
  styleUrls: ['./animal-user-profile.component.css']
})
export class AnimalUserProfileComponent implements OnInit {
  animal: any = {
    id: '',
    name: '',
    type: '',
    birthDate: '',
    gender: '',
    statusAdoption: '',
    description: '',
    institution: { id: '', name: '' },
    user: { id: '', name: '' },
    photoUrl: ''
  };
  
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private location: Location,
    private animalService: AnimalService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadAnimal();
  }

  private loadAnimal(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Obtém o ID da URL

    if (!id) {
      this.errorMessage = 'ID do animal não encontrado na URL';
      this.isLoading = false;
      return;
    }

    this.animalService.getAnimal(id).subscribe({
      next: (data) => {
        this.animal = data; // Define os dados do animal corretamente
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar informações do animal';
        this.isLoading = false;
        console.error('Erro:', err);
      }
    });
  }

  solicitarAdocao(): void {
    if (!this.animal?.id) {
      this.errorMessage = 'Animal inválido para adoção';
      return;
    }

    this.isLoading = true;
    this.animalService.solicitarAdocao(this.animal.id).subscribe({
      next: () => {
        this.isLoading = false;
        alert('Solicitação de adoção enviada com sucesso!');
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Erro ao solicitar adoção';
        console.error('Erro:', err);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

}