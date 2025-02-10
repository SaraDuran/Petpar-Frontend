import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Donation, DonationService} from '../../services/donation.service';
import { NavbarComponent } from '../navbar-usuario/navbar.component';

@Component({
  selector: 'app-donation-user-list',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterLink],
  templateUrl: './donation-user-list.component.html',
  styleUrls: ['./donation-user-list.component.css'],
})
export class DonationUserListComponent implements OnInit {
  donations: Donation[] = [];
  institutionList: any[] = [];
  loading = false;
  errorMessage: string | null = null;
  institutionId!: number;

  constructor(
    private donationService: DonationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.institutionId = Number(this.route.snapshot.queryParamMap.get('institutionId'));

    if (!this.institutionId) {
      this.errorMessage = 'ID da instituição não encontrado!';
      return;
    }
    console.log('ngOnInit executado');
    this.loadInstitutions();
  }

  loadInstitutions(): void {
    this.loading = true;
    this.donationService.getAllInstitutions(this.institutionId).subscribe({
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
}
