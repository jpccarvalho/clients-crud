import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'authToken';
  private readonly apiUrl = environment.apiUrl + '/login';
  private readonly httpClient = inject(HttpClient);

  constructor(private router: Router) {}

  login(payload: {
    email: string;
    password: string;
  }): Observable<{ token: string }> {
    // simulando um retorno com sucesso, trazendo o token do backend
    return this.httpClient.get<{ token: string }>(this.apiUrl + '/1').pipe(
      tap((response) => {
        if (!!response && !!response.token) {
          localStorage.setItem(this.tokenKey, response.token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
