import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private apiUrl = 'http://localhost:8080/animals'; 

  constructor(private http: HttpClient) {}

  registerAnimal(animalData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/register`, animalData, { headers });
  }

  getAnimal(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getAnimals(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteAnimal(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  solicitarAdocao(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/adocao`, {});
  }

  getAvailableAnimals(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/animals/available`);
  }

  requestAdoption(animalId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/adoptions`, {
      animalId,
      status: 'PENDING'
    });
  }
}
