import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class UserService 
{
    private readonly _http = inject(HttpClient);
    private readonly _auth = inject(AuthService);
}
