import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStore } from '../store/auth.store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authStore: AuthStore, private _router: Router) {}

  canActivate(): boolean {
    if(this._authStore.isLoggedIn) {
      return true;
    } else {
      this._router.navigateByUrl('login');
      return false;
    }
  }

}
