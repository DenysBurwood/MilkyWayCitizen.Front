import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '@core/services/auth-service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, ButtonModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar 
{
    private readonly _auth = inject(AuthService);
    private readonly _router = inject(Router);
    picture: string = "assets/icons/galaxy-svgrepo-com.svg";
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
