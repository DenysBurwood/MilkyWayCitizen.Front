import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, OnChanges, Signal, signal, SimpleChanges } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { firstValueFrom, tap } from 'rxjs';
import { environment } from '@env';
import {    LoginResponse, 
            TokenResponse, 
            UserDetails, 
            UserLoginForm, 
            UserRegisterForm } from '@core/models';
import { Roles } from '@core/enum/roles';
import { UserRegisterFormNoDate } from '@core/models/users/user-registe-form-no-date.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService
{
    private readonly _http = inject(HttpClient);
    
    private _token = signal<string | null>(null);
    token = this._token.asReadonly();
    
    private _role = signal<Roles | null>(null);
    role = this._role.asReadonly();
    
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
                this._role.set(null);
            }
            else
            {
                localStorage.setItem("token", token);
                const tokenProp = jwtDecode<TokenResponse>(token)
                
                //console.log(tokenProp);
                this._role.set(tokenProp['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
                
            }
        })
    }
    register(form: UserRegisterForm)
    {
        return this._http.post<void>(environment.apiUrl + "User/register", form).pipe(tap()).subscribe();
    }

    async login(form: UserLoginForm)
    {
        const response = await firstValueFrom(this._http.post<LoginResponse>(environment.apiUrl + "User/login", form));
        this._token.set(response.token);

        //const temp = this._http.post<LoginResponse>(environment.apiUrl + "User/login", form).pipe(tap()).subscribe();
        //this._token.set(temp().)
        
    }
    logout()
    {
        this._token.set(null);
    }

    async getOwnProfile()
    {
        const response = await firstValueFrom(this._http.get<UserDetails>(environment.apiUrl + "User/my_account"))
        return response;
    }
    // async getFullProfile()
    // {
    //     const response = await firstValueFrom(this._http.get<)
    // }
}
