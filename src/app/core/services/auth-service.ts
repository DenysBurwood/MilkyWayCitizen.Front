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

    private _userId = signal<number | null>(null);
    userId=this._userId.asReadonly();
    
    isConnected: Signal<boolean> = computed(() => !!this.token());
    
    private _authError=signal<string>("Default error");
    authError=this._authError.asReadonly();

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
                this._userId.set(tokenProp["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"]);
            }
        })
    }
    async register(form: UserRegisterForm)
    {
        //return this._http.post<void>(environment.apiUrl + "User/register", form).pipe(tap()).subscribe();
        return await firstValueFrom(this._http.post<void>(environment.apiUrl + "User/register", form))
    }

    async login(form: UserLoginForm)
    {
        const response = await firstValueFrom(this._http.post<LoginResponse>(environment.apiUrl + "User/login", form));
        this._token.set(response.token);
        
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
    
    setAuthError(error: string)
    {
        this._authError.set(error);
    }
}
