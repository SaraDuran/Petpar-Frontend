import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InstitutionService {
  private baseUrl = 'http://localhost:8080/v1/institution';

  constructor(private http: HttpClient) {}

  registerInstitution(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    console.log("InstitutionData: ", data)
    return this.http.post(this.baseUrl, data, { headers });
  }

  loginInstitution(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let params = new HttpParams()
          .set('email', email)
          .set('password', password);

    return this.http.get(this.baseUrl,  { headers, params });
  }


}
