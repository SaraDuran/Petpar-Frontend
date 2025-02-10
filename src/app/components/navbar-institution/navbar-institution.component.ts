import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive, ActivatedRoute} from '@angular/router';
import {CommonModule, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-navbar-institution',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, NgOptimizedImage],
  templateUrl: './navbar-institution.component.html',
  styleUrls: ['./navbar-institution.component.css']
})
export class NavbarInstitutionComponent {
  id: number =0;
  constructor(private router: Router,private route: ActivatedRoute) {
    this.id = this.route.snapshot.params[`id`];
  }

  logout(): void {
    localStorage.removeItem('userToken'); //token do usuário
    this.router.navigate(['']); // Redireciona para a página de HOME
  }

//     ngOnInit() {
//       this.route.paramMap.subscribe(params => {
//         this.id = params.get('id') ? +params.get('id')! : null; // Convertendo para número
//       });
//     }
}
