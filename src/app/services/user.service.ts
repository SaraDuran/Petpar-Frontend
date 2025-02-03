import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root',
})

export class UserService {
  private apiUrl = 'http://localhost:8080/v1/user';

  constructor(private http: HttpClient) {}

  // Metodo para registrar um usuário
  registerUser(userData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //console.log("Aqui!!!")
    return this.http.post(this.apiUrl, userData, { headers });

  }

  // Metodo para autenticar um usuário
  loginUser(credentials: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/login`, credentials, { headers });
  }


}
