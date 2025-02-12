import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { Donation, DonationService } from '../../services/donation.service';
import {NavbarInstitutionComponent} from '../navbar-institution/navbar-institution.component';

@Component({
  selector: 'app-donation-institution-list',
  standalone: true,
  imports: [CommonModule, NavbarInstitutionComponent],
  templateUrl: './donation-institution-list.component.html',
  styleUrls: ['./donation-institution-list.component.css']
})
export class DonationInstitutionListComponent implements OnInit {
  donations: any[] = [];
  loading = false;
  errorMessage: string | null = null;
  institutionId: number = 0;

  constructor(
    private donationService: DonationService,private route: ActivatedRoute,private router: Router
  ) {}

  ngOnInit(): void {
    this.institutionId = this.route.snapshot.params[`id`];
    this.loadDonations();
  }

  loadDonations(): void {
    this.loading = true;
    this.errorMessage = null;

    //const institutionId = this.authService.getCurrentInstitution()?.id;

    if (!this.institutionId) {
      this.errorMessage = 'Instituição não autenticada';
      this.loading = false;
      return;
    }

    this.donationService.getInstitutionDonations(this.institutionId).subscribe({
      next: (data) => {
        this.donations = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar doações';
        this.loading = false;
        console.error(err);
      }
    });
  }

  updateStatus(donationId: string, status: 'confirmado' | 'recusado'): void {
    this.loading = true;
    this.errorMessage = null;

    this.donationService.updateDonationStatus(donationId, status).subscribe({
      next: () => {
        this.loadDonations(); // Recarrega a lista após a atualização
      },
      error: (err) => {
        this.errorMessage = 'Erro ao atualizar status';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
