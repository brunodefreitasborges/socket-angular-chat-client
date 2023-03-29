import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';
import { LoginData, LoginResponse } from './login';
import { JwtHelperService } from '@auth0/angular-jwt';


const AUTH_API = 'https://socket-angular-chat-server.onrender.com/api/auth/';
// const AUTH_API = 'http://localhost:3000/api/auth/';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_COOKIE = 'socket-angular-chat-token';

  constructor(
    private _http: HttpClient,
    private _cookieService: CookieService,
    private _jwtHelper: JwtHelperService) { }

  login(login: LoginData): Observable<HttpResponse<LoginResponse>> {
    return this._http.post<LoginResponse>(AUTH_API + 'login', {
      email: login.email,
      password: login.password
    }, { headers, observe: 'response'}).pipe(
      tap(response => {
        const authToken = response.headers.get('authorization-token');
        if(authToken) {
          this._cookieService.set(this.TOKEN_COOKIE, authToken!);
          localStorage.setItem("access_token", authToken!);
          localStorage.setItem('username', response.body!.username);
        }
      })
    );
  }

  getToken(): string | null {
    return this._cookieService.get(this.TOKEN_COOKIE);
  }

  isLoggedIn(): boolean {
    const token = this._cookieService.get(this.TOKEN_COOKIE);
    if (!token) {
      return false;
    }
    // Check if the token is expired
    const isTokenExpired = this._jwtHelper.isTokenExpired(token);
    return !isTokenExpired;
  }

  logout(): void {
    this._cookieService.delete(this.TOKEN_COOKIE);
  }
}
