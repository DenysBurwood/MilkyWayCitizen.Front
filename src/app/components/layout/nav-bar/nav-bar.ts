import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '@core/services/auth-service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar 
{
    private readonly _auth = inject(AuthService);
    private readonly _router = inject(Router);
    isConnected()
    {
        return this._auth.isConnected();
    }
    logout()
    {
        this._auth.logout();
        this._router.navigate(["/"]);
    }
}
