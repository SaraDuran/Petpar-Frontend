import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from '../../services/animal.service';
import { UserService } from '../../services/user.service';
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
  approvedAnimals: Set<number> = new Set();

  constructor(private animalService: AnimalService,private userService: UserService, private http: HttpClient,private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.institutionId = this.route.snapshot.params[`id`];
    this.loadApprovedAnimals();
    this.loadAnimals();
  }

  saveApprovedAnimals() {
    localStorage.setItem('approvedAnimals', JSON.stringify(Array.from(this.approvedAnimals)));
  }

  loadApprovedAnimals() {
    const storedAnimals = localStorage.getItem('approvedAnimals');
    if (storedAnimals) {
      this.approvedAnimals = new Set(JSON.parse(storedAnimals));
    }
  }

  loadAnimals(): void {
  let params = new HttpParams()
            .set('pageNumber', 0)
            .set('pageSize', 100);

    this.http.get<any[]>(`http://localhost:8080/v1/animal-list/${this.institutionId}`, { params }).subscribe({
      next: (data: any[]) => {
        console.log('Dados recebidos:', data);
        this.animals = data.filter(animal => {
          this.userService.getById(animal.user_id).subscribe({
            next: (data) => {
              animal.user_name = data.name;
              animal.user_phone = data.phone_number;
              console.log("Animal carregado com sucesso:", data);
            },
            error: (err) => {
              console.error("Erro ao buscar animal:", err);
            }
          });
        });
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
      this.userService.getById(animal.user_id).subscribe({
        next: (data) => {
          animal.user_name = data.name;
          console.log("Animal carregado com sucesso:", data);
        },
        error: (err) => {
          console.error("Erro ao buscar animal:", err);
        }
      });
//
//         if(animal.user_id === null){
//           userService.getById(animal.user_id).subscribe({
//                 next: (data) => {
//                   animal.user_name = data.name
//                   console.log("Animal carregado com sucesso:", data);
//                 },
//                 error: (err) => {
//                   animal.user_name = animal.user_id;
//                 }
//               });
//         }



      return matchesSpecies && matchesStartDate && matchesEndDate && matchesInstitution;
    });
  }

  editAnimal(animalId: string): void {
    if (!animalId || !this.institutionId) {
      console.error("Erro: ID do animal ou da instituição está faltando.");
      return;
    }

    console.log(`Editando animal com ID: ${animalId}, Instituição: ${this.institutionId}`);
    this.router.navigate([`/animal-institution-profile`, this.institutionId], {
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
          this.approvedAnimals.add(animalId);
          this.saveApprovedAnimals(); // Salva no LocalStorage
          this.loadAnimals(); // Atualiza a lista
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
            alert("Adoção negada com sucesso!");
            this.loadAnimals();
          },
          error: (err) => {
            console.error("Erro ao reprovar adoção:", err);
            alert("Erro ao reprovar adoção. Tente novamente.");
          }
        });
      }
    }
  showAdoptedAlert(): void {
    alert("Animal adotado. Entre em contato com o adotante para acompanhar o processo de adaptação.");
  }

}
