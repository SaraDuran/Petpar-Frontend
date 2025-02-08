import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router'
import { InstitutionService } from '../../services/institution.service';

@Component({
  selector: 'app-institution-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './institution-login.component.html',
  styleUrls: ['./institution-login.component.css'],
})
export class InstitutionLoginComponent {
  email: string = '';
  password: string = '';

  constructor(private institutionService: InstitutionService, private router: Router) {}

  onSubmit() {

    this.institutionService.loginInstitution(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login realizado com sucesso:', response);
        alert('Login bem-sucedido!');
        this.router.navigateByUrl('/institution-animal-list');
      },
      error: (err) => {
        console.error('Erro ao fazer login:', err);
        alert('Erro ao fazer login. Verifique os dados e tente novamente.');
      },
    });
  }
}
