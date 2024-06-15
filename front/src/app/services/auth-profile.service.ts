import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const BACKEND = environment.api.backend;

@Injectable({ providedIn: 'root' })
export class AuthProfileService {
  constructor(private _httpClient: HttpClient, private router: Router) {
    if (this.checkForAuthorizedToken()) {
      const token = this.currentToken ?? this.getAccessToken();
      this._httpClient
        .post<{ token: string }>(`${BACKEND}/token/refresh/`, { token })
        .subscribe({
          next: ({ token }) => {
            this.saveTokens(token);
          },
          error: (error) => {
            this.router.navigate(['']);
          },
        });
    }
  }

  currentToken: string | null = null;

  checkForAuthorizedToken(): boolean {
    return this.currentToken !== null || this.getAccessToken() !== null;
  }

  saveTokens(token: string): void {
    localStorage.setItem('token', token);
    this.currentToken = token;
  }

  getAccessToken(): string | null {
    return localStorage.getItem('token');
  }

  clearTokens(): void {
    this.currentToken = null;
    localStorage.removeItem('token');
  }
}
