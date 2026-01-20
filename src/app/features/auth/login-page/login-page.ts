import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth-service';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage 
{
    private readonly _fb = inject(FormBuilder);
    private readonly _router = inject(Router);
    private readonly _auth = inject(AuthService);

    userName = new FormControl("", [Validators.required]);
    password = new FormControl("", [Validators.required]);

    loginForm = this._fb.group(
    {
        userName: this.userName,
        password: this.password,
    })

    onSubmit()
    {
        if(this.loginForm.valid)
        {
            this._auth.login(
            {
                userName: this.loginForm.value.userName!,
                password: this.loginForm.value.password!,
            })
        }
    }
}
