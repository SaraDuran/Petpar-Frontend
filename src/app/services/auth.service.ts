import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface User {
  id: string;
  name: string;
  email: string;
  type: 'user' | 'institution';
  // Adicione outros campos conforme necessário
}

export interface Institution {
  id: string;
  name: string;
  cnpj: string;
  email: string;
  // Adicione outros campos conforme necessário
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private currentInstitutionSubject = new BehaviorSubject<Institution | null>(null);
  private readonly AUTH_KEY = 'petpar_auth';
  private readonly TOKEN_KEY = 'petpar_token';

  constructor(private router: Router) {
    this.loadInitialAuthState();
  }

  // Carrega o estado inicial do localStorage
  private loadInitialAuthState(): void {
    const authData = localStorage.getItem(this.AUTH_KEY);
    if (authData) {
      const { user, institution, token } = JSON.parse(authData);
      if (user) this.currentUserSubject.next(user);
      if (institution) this.currentInstitutionSubject.next(institution);
    }
  }

  // Login para usuários comuns
  loginUser(email: string, password: string): Observable<boolean> {
    // Simulação de chamada API
    return of(true).pipe(
      delay(500),
      tap(() => {
        const mockUser: User = {
          id: 'user-123',
          name: 'Fulano da Silva',
          email: email,
          type: 'user'
        };
        
        this.setAuthState({ user: mockUser });
        this.router.navigate(['/user/dashboard']);
      })
    );
  }

  // Login para instituições
  loginInstitution(email: string, password: string): Observable<boolean> {
    // Simulação de chamada API
    return of(true).pipe(
      delay(500),
      tap(() => {
        const mockInstitution: Institution = {
          id: 'inst-456',
          name: 'PetPar Institution',
          cnpj: '00.000.000/0001-00',
          email: email
        };
        
        this.setAuthState({ institution: mockInstitution });
        this.router.navigate(['/institution/dashboard']);
      })
    );
  }

  // Logout geral
  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
    this.currentUserSubject.next(null);
    this.currentInstitutionSubject.next(null);
    this.router.navigate(['/login']);
  }

  // Verifica se está autenticado
  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value || !!this.currentInstitutionSubject.value;
  }

  // Obtém o usuário atual
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Obtém a instituição atual
  getCurrentInstitution(): Institution | null {
    return this.currentInstitutionSubject.value;
  }

  // Observables para componentes
  get currentUser$(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  get currentInstitution$(): Observable<Institution | null> {
    return this.currentInstitutionSubject.asObservable();
  }

  // Atualiza o token JWT
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Obtém o token JWT
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Método privado para atualizar o estado de autenticação
  private setAuthState(params: { user?: User; institution?: Institution; token?: string }): void {
    if (params.user) {
      this.currentUserSubject.next(params.user);
    }
    if (params.institution) {
      this.currentInstitutionSubject.next(params.institution);
    }
    if (params.token) {
      this.setToken(params.token);
    }

    localStorage.setItem(this.AUTH_KEY, JSON.stringify({
      user: params.user,
      institution: params.institution
    }));
  }

  // Método para desenvolvimento: mock de usuário
  mockLoginAsUser(): void {
    const mockUser: User = {
      id: 'user-123',
      name: 'Usuário Teste',
      email: 'teste@petpar.com',
      type: 'user'
    };
    this.setAuthState({ user: mockUser });
  }

  // Método para desenvolvimento: mock de instituição
  mockLoginAsInstitution(): void {
    const mockInstitution: Institution = {
      id: 'inst-456',
      name: 'Instituição Teste',
      cnpj: '00.000.000/0001-00',
      email: 'instituicao@petpar.com'
    };
    this.setAuthState({ institution: mockInstitution });
  }
}