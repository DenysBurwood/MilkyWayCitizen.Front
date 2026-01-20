import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, Signal, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { firstValueFrom } from 'rxjs';
import { environment } from '@env';
import { UserRegisterForm } from '@core/models/user-register-form.models';
import { UserLoginForm } from '@core/models/user-login-form.model';
import { LoginResponse } from '@core/models/user-login-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService 
{
    private readonly _http = inject(HttpClient);
    
    private _token = signal<string | null>(null);
    token = this._token.asReadonly();

    isConnected: Signal<boolean> = computed(() => !!this.token());

    constructor()
    {
        const tokenStr = localStorage.getItem("token");
        if (tokenStr)
        {
            this._token.set(tokenStr);
        }
        effect (() => 
        {
            const token = this._token();
            if (token==null)
            {
                localStorage.removeItem("token");
                //this.role.set(null);
            }
            else
            {
                localStorage.setItem("token", token);
                const tokenProp = jwtDecode(token)
            }
        })
    }
    register(form: UserRegisterForm)
    {
        return firstValueFrom(this._http.post<void>(environment.apiUrl + "User/register", form));
    }

    async login(form: UserLoginForm)
    {
        const response = await firstValueFrom(this._http.post<LoginResponse>(environment.apiUrl + "User/login", form));
        console.log(response.token);
        this._token.set(response.token);
        
    }
    logout()
    {
        this._token.set(null);
    }
}
