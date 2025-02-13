import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    console.log("UserData: ", userData)
    return this.http.post(this.apiUrl, userData, { headers });

  }



  // Metodo para autenticar um usuário
  loginUser(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let params = new HttpParams()
          .set('email', email)
          .set('password', password);

    return this.http.get(this.apiUrl,  { headers, params });
  }


  getById(id: number): Observable<any> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.get(`${this.apiUrl}/${id}`, {headers});
    }


}
