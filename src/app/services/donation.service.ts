import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type PaymentMethod = 'CARTAO' | 'PIX';

export interface Donation {
  id: string;
  amount: number;
  paymentMethod: PaymentMethod;
  cardDetails?: {
    cardName: string;
    cardNumber: string;
    cardExpiry: string;
    cardCVV: string;
  };
  donationDate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  private apiUrl = 'http://localhost:8080/v1/donation';

  constructor(private http: HttpClient) { }

  createDonation(donation: Partial<Donation>): Observable<Donation> {
    return this.http.post<Donation>(this.apiUrl, donation);
  }

  getUserDonations(userId: string): Observable<Donation[]> {
    return this.http.get<Donation[]>(`${this.apiUrl}/user/${userId}`);
  }

  getInstitutionDonations(institutionId: string): Observable<Donation[]> {
    return this.http.get<Donation[]>(`${this.apiUrl}/institution/${institutionId}`);
  }

  updateDonationStatus(id: string, status: 'confirmado' | 'recusado'): Observable<Donation> {
    return this.http.patch<Donation>(`${this.apiUrl}/${id}/status`, { status });
  }

  getAllInstitutions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/list-institution`);
  }
}
