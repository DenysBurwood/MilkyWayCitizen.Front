import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth-service';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage 
{
    private readonly _fb = inject(FormBuilder);
    private readonly _router = inject (Router);
    private readonly _auth = inject(AuthService)

    userName = new FormControl('', [Validators.required]);
    firstName = new FormControl('', [Validators.required]);
    lastName = new FormControl('', [Validators.required]);
    email = new FormControl('', [Validators.required]);
    birthDate = new FormControl<Date|null>(new Date(), [Validators.required]);
    password = new FormControl('', [Validators.required]);

    registerForm = this._fb.group(
    {
        userName: this.userName,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        birthDate: this.birthDate,
        password: this.password,
    });
     onSubmit()
    {
        if(this.registerForm.valid)
        {
            this._auth.register(
            {
                userName: this.registerForm.value.userName!,
                firstName: this.registerForm.value.firstName!,
                lastName: this.registerForm.value.lastName!,
                email: this.registerForm.value.email!,
                password: this.registerForm.value.password!,
                birthDate: this.registerForm.value.birthDate!
            }).then(() => 
            {
                this._router.navigate(["/login"]);
            }).catch((err) => 
            {
                console.error(err);

            })
        }
    }
}
