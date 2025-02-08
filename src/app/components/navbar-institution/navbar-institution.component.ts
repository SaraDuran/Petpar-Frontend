import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {CommonModule, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-navbar-institution',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  templateUrl: './navbar-institution.component.html',
  styleUrls: ['./navbar-institution.component.css']
})
export class NavbarInstitutionComponent {
  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('userToken'); // Remove o token do usuário
    this.router.navigate(['']); // Redireciona para a página de login
  }
}
