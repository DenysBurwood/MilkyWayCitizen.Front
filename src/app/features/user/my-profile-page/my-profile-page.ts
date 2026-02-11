import { Component, inject, OnInit } from '@angular/core';
import { UserDetails } from '@core/models';
import { AuthService } from '@core/services/auth-service';
import { Spinner } from "@components/animation/spinner/spinner";
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { UserService } from '@core/services';
import { PasswordModule } from 'primeng/password';
import { Router } from '@angular/router';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-my-profile-page',
  imports: [Spinner, TableModule, ButtonModule, DialogModule, InputTextModule, FormsModule, PasswordModule],
  templateUrl: './my-profile-page.html',
  styleUrl: './my-profile-page.scss',
})
export class MyProfilePage implements OnInit
{
    private readonly _auth = inject(AuthService);
    private readonly _user = inject(UserService);
    private readonly _router = inject(Router);
    //private readonly _user = inject(UserS)
    myProfileDetails: UserDetails|null = null;
    isAddressHidden: boolean = true;
    confirmDeleteVisible:boolean=false;
    confirmPassword:string="";
    
    async ngOnInit(): Promise<void> {
        this.myProfileDetails = await this._auth.getOwnProfile();
    }

    onAddressVisibility()
    {
        this.isAddressHidden = !this.isAddressHidden;
    }

    showDeleteDialog()
    {
        this.confirmDeleteVisible=true;
    }

    async onDelete(password:string)
    {
        this.confirmDeleteVisible=false;
        const result:boolean|null = await this._user.deleteOwnAccount(password);
        if (result)
        {
            this._auth.logout();
        }
        this._router.navigate(["/"]);
    }
}
