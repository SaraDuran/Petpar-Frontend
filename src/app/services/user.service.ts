import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/v1/user';

  constructor(private http: HttpClient) {}

  registerUser(userData: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}`, userData); // POST para o endpoint de cadastro
  }

  loginUser(credentials: { email: string; password: string }): Observable<any> {
    return this.http.get(`${this.baseUrl}/login`, {
      params: {
        email: credentials.email,
        password: credentials.password,
      },
    });
  }
}
