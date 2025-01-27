import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private baseUrl = 'http://localhost:8080/v1/contact'; // Ajuste a URL do seu endpoint

  constructor(private http: HttpClient) {}

  sendMessage(contactData: { name: string; email: string; subject: string; message: string }): Observable<any> {
    return this.http.post(this.baseUrl, contactData);
  }
}
