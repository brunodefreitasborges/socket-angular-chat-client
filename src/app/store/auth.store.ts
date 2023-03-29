import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { catchError, EMPTY, Observable, switchMap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { LoginData } from "../services/login";
import { SnackbarService } from "../services/snackbar.service";

export interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false
}

@Injectable({
  providedIn: 'root'
})
export class AuthStore extends ComponentStore<AuthState> {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _snackService: SnackbarService) {
    super(initialState);
  }

  readonly login = this.effect((login$: Observable<LoginData>) => {
    return login$.pipe(
      switchMap((login) =>
        this._authService.login(login).pipe(
          tapResponse(
            (response) => {
              console.log(response);
              this.patchState({ isLoggedIn: true });
              this._router.navigateByUrl('/chat');
            },
            (error: HttpErrorResponse) => {
              this._snackService.openSnackBar(error.error, "Close");
            }
          ),
          catchError(() => EMPTY)
        )
      )
    );
  });

  readonly isLoggedIn = this.select((state) => state.isLoggedIn);


}
