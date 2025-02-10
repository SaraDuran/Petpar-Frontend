import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DonationService } from '../../services/donation.service';
import { NavbarComponent } from '../navbar-usuario/navbar.component';

@Component({
  selector: 'app-donation-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './donation-user-list.component.html',
  styleUrls: ['./donation-user-list.component.css'],
})
export class DonationUserListComponent implements OnInit {
  institutionList: any[] = [];
  loading = false;
  errorMessage: string | null = null;

  constructor(private donationService: DonationService) {}

  ngOnInit(): void {
    this.loadInstitutions();
  }

  loadInstitutions(): void {
    this.loading = true;
    this.donationService.getAllInstitutions().subscribe({
      next: (data) => {
        console.log('Instituições carregadas:', data); // 🔍 Verifique se os dados estão vindo
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
}