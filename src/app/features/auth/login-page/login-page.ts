import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth-service';
import { ButtonModule } from 'primeng/button';
import { InputGroup } from "primeng/inputgroup";
import { InputGroupAddon } from "primeng/inputgroupaddon";
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from "primeng/password";
import { Message } from "primeng/message";

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, InputGroup, InputGroupAddon, RouterLink, ButtonModule, InputTextModule, Message, PasswordModule],
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
            });
            this._router.navigate(["/"])
        }
    }

    isInvalid(controlName: string)
    {
        const control = this.loginForm.get(controlName);
        //console.log(control?.invalid);
        
        return control?.invalid && (control.touched/* || this.formSubmitted*/);
    }
}
