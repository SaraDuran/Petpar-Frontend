import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { RouterLink, RouterLinkActive, ActivatedRoute} from '@angular/router';
import {CommonModule, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, NgOptimizedImage],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  id: number =0;
  constructor(private router: Router,private route: ActivatedRoute) {
  this.id = this.route.snapshot.params[`id`];}

  logout(): void {
    console.log('Logout chamado!');
    localStorage.removeItem('userToken'); // Remove o token do usuário (se estiver usando)
    this.router.navigate(['']); // Redireciona para a página de login
  }
}
