import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginData } from '../../services/login';
import { AuthStore } from '../../store/auth.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  passwordHide = "text"

  constructor(private _authStore: AuthStore, private _router: Router) {}

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  submit() {
    const loginData: LoginData = {
      email: this.form.value.email!,
      password: this.form.value.password!
    }

    this._authStore.login(loginData);
  }

  changeType() {
    this.passwordHide = "password";
  }
}
