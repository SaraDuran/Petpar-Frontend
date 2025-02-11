import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar-institution',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, NgOptimizedImage],
  templateUrl: './navbar-institution.component.html',
  styleUrls: ['./navbar-institution.component.css']
})
export class NavbarInstitutionComponent {
  id: number =0;
//   animal: number =0;
  constructor(private router: Router,private route: ActivatedRoute) {
    this.id = this.route.snapshot.params[`id`];
//     this.animal = this.route.snapshot.params[`animal`];
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
