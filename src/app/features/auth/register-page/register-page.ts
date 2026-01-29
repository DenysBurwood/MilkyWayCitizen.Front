import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth-service';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { PasswordModule } from "primeng/password";
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, InputGroup, FormsModule, InputGroupAddon, PasswordModule, DatePickerModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage 
{
    private readonly _fb = inject(FormBuilder);
    private readonly _router = inject (Router);
    private readonly _auth = inject(AuthService);

    userName = new FormControl('', [Validators.required]);
    firstName = new FormControl('', [Validators.required]);
    lastName = new FormControl('', [Validators.required]);
    email = new FormControl('', [Validators.required]);
    birthDate = new FormControl<Date|null>(new Date(), [Validators.required]);
    password = new FormControl('', [Validators.required]);
    streetName = new FormControl('', [Validators.required]);
    streetNumber = new FormControl(0, [Validators.min(0)]);
    city = new FormControl('', [Validators.required]);
    country = new FormControl('', [Validators.required]);

    registerForm = this._fb.group(
    {
        userName: this.userName,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        birthDate: this.birthDate,
        password: this.password,
        streetName:this.streetName,
        streetNumber:this.streetNumber,
        city: this.city,
        country: this.country,
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
                birthDate: this.registerForm.value.birthDate!,
                streetName: this.registerForm.value.streetName!,
                streetNumber: this.registerForm.value.streetNumber!,
                city: this.registerForm.value.city!,
                country: this.registerForm.value.country!,
            })/*.then(() => 
            {
                this._router.navigate(["/"]);
            }).catch((err) => 
            {
                console.error(err);

            })*/
            
            
            
        }
        console.log(this.registerForm.value.birthDate?.toJSON());
        
    }
}
