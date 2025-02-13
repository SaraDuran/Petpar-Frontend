import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DonationService } from '../../services/donation.service';
import { NavbarComponent } from '../navbar-usuario/navbar.component';

@Component({
  selector: 'app-donation-user-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './donation-user-register.component.html',
  styleUrls: ['./donation-user-register.component.css']
})
export class DonationUserRegisterComponent {
  donationForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;
  showCreditCard = true;
  userId: number =0;
  institutionId: number =0;

  constructor(
    private fb: FormBuilder,
    private donationService: DonationService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.route.params.subscribe(params => {
      this.userId = params['id'];
    });

    this.route.queryParams.subscribe(queryParams => {
      this.institutionId = queryParams['institutionId'];
    });

    this.donationForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0.01)]],
      payment_method: ['CARTAO', Validators.required],
      cardName: [''],
      cardNumber: [''],
      cardExpiry: [''],
      cardCVV: ['']
    });

    this.setupPaymentValidation();
  }

  private setupPaymentValidation() {
    const creditCardFields = ['cardName', 'cardNumber', 'cardExpiry', 'cardCVV'];

    this.donationForm.get('payment_method')?.valueChanges.subscribe(method => {
      this.showCreditCard = method === 'CARTAO';

      creditCardFields.forEach(field => {
        const control = this.donationForm.get(field);
        if (method === 'CARTAO') {
          control?.setValidators([Validators.required]);
        } else {
          control?.clearValidators();
        }
        control?.updateValueAndValidity();
      });
    });
  }

  onSubmit(): void {
    if (this.donationForm.invalid) return;

    this.loading = true;
    this.errorMessage = null;

    const donationData = {
      ...this.donationForm.value,
      donationDate: new Date()
    };

    if (donationData.paymentMethod === 'PIX') {
      delete donationData.cardName;
      delete donationData.cardNumber;
      delete donationData.cardExpiry;
      delete donationData.cardCVV;
    }
    donationData.institution_id = this.institutionId;
    donationData.user_id = this.userId;

    this.donationService.createDonation(donationData).subscribe({
      next: () => {
        alert('Doação enviado com sucesso!');
        this.router.navigate(['/donation-user-list', this.institutionId]);
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao registrar doação';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
