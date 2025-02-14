import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private apiUrl = 'http://localhost:8080/v1/animal';

  constructor(private http: HttpClient) {}

  registerAnimal(animalData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, animalData, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  getAnimal(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getAnimals(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`); // Corrigido para buscar todos os animais corretamente
  }

  deleteAnimal(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  solicitarAdocao(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/adoption`, {}); // Corrigido o endpoint
  }

  getAvailableAnimals(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/available`);
  }

  requestAdoption(animalId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/adoptions`, {
      animalId,
      status: 'PENDING',
    });
  }

  approveAdoption(animalId: number): Observable<any> {
    return this.http.put(`http://localhost:8080/v1/adoption/approve?animalId=${animalId}`, {}, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  

  reproveAdoption(animalId: number): Observable<any> {
    return this.http.put(`http://localhost:8080/v1/adoption/reprove?animalId=${animalId}`, {}, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}