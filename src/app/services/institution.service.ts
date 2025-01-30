import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InstitutionService {
  private baseUrl = 'http://localhost:8080/v1/institution';

  constructor(private http: HttpClient) {}

  registerInstitution(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  loginInstitution(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }


}
