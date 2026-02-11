import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth-service';
import { environment } from '@env';
import { userDeleteOwn } from '@core/models/users/user-delete-own.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService 
{
    private readonly _http = inject(HttpClient);
    private readonly _auth = inject(AuthService);

    async deleteOwnAccount(password:string)
    {
        const userId:number|null=this._auth.userId();
        if (userId!==null)
            {
                const user:userDeleteOwn={password: password, userId: userId};
                const params = new HttpParams().set("Password", password);
                console.log("test");
               return firstValueFrom(this._http.delete<boolean>(environment.apiUrl + "User/Delete", {params}))
        }
        return null;
    }
}
