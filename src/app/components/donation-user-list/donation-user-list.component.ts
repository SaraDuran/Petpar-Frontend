import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router} from '@angular/router';
import {Donation, DonationService} from '../../services/donation.service';
import { NavbarComponent } from '../navbar-usuario/navbar.component';

@Component({
  selector: 'app-donation-user-list',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './donation-user-list.component.html',
  styleUrls: ['./donation-user-list.component.css'],
})
export class DonationUserListComponent implements OnInit {
  donations: Donation[] = [];
  institutionList: any[] = [];
  loading = false;
  errorMessage: string | null = null;
  userId!: number;

  constructor(
    private donationService: DonationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params[`id`];
    this.loadInstitutions();
  }

  loadInstitutions(): void {
    this.loading = true;
    this.donationService.getAllInstitutions().subscribe({
      next: (data) => {
        console.log('Dados recebidos do backend:', data);

        this.institutionList = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar instituições';
        console.error(err);
        this.loading = false;
      }
    });
  }

  doar(institutionId: number): void {
//     if (!this.userId || !institutionId) {
//       console.error("Erro: ID do animal ou da instituição está faltando.");
//       return;
//     }

//     this.router.navigate([`/animal-institution-profile/${this.institutionId}`], {
    this.router.navigate([`/donation-user-register`, this.userId], {
      queryParams: { institutionId }
    });
  }

}
