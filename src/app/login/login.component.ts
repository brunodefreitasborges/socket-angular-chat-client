import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginData } from '../services/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private _auth: AuthService, private _router: Router) {}

  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  submit() {
    const loginData: LoginData = {
      email: this.form.value.email!,
      password: this.form.value.password!
    }

    this._auth.login(loginData).subscribe(
      (response) => {
        this._router.navigateByUrl('chat');
      },
      (error) => {
        console.error('Error: ', error);
      }
    );
  }
}
