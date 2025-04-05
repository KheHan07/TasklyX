import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginResponse {
  username: string;
  tokenid: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  // Return the plain text success message
  register(username: string, password: string): Observable<string> {
    return this.http
      .post(
        `${this.authUrl}/register`,
        { username, password },
        { responseType: 'text' }
      ) as Observable<string>;
  }
  
  
  

  // login returns JSON { username, tokenid }
  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.authUrl}/login`, { username, password });
  }

  // localStorage stuff
  setUsernameAndToken(username: string, tokenid: string): void {
    localStorage.setItem('username', username);
    localStorage.setItem('tokenid', tokenid);
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  getTokenid(): string | null {
    return localStorage.getItem('tokenid');
  }

  isLoggedIn(): boolean {
    return !!(this.getUsername() && this.getTokenid());
  }

  logout(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('tokenid');
  }
}
