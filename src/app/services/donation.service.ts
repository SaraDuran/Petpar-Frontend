import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type PaymentMethod = 'CARTAO' | 'PIX';

export interface Donation {
  id: string;
  amount: number;
  payment_method: PaymentMethod;
  institution_id: number;
  user_id: number;
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

  createDonation(donation: any): Observable<Donation> {
    return this.http.post<any>(this.apiUrl, donation, {});
  }

  getUserDonations(userId: string): Observable<Donation[]> {
    return this.http.get<Donation[]>(`${this.apiUrl}/user/${userId}`);
  }

  getInstitutionDonations(institutionId: number): Observable<any[]> {
  let params = new HttpParams()
            .set('institutionId', institutionId);
    return this.http.get<any[]>(`${this.apiUrl}/institution-donations`, {params});
  }

  updateDonationStatus(id: string, status: 'confirmado' | 'recusado'): Observable<Donation> {
    return this.http.patch<Donation>(`${this.apiUrl}/${id}/status`, { status });
  }

  getAllInstitutions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/list-institution`);
  }
}
