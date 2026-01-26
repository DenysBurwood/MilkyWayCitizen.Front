import { Component, inject, OnInit } from '@angular/core';
import { UserDetails } from '@core/models';
import { AuthService } from '@core/services/auth-service';
import { Spinner } from "@components/animation/spinner/spinner";

@Component({
  selector: 'app-my-profile-page',
  imports: [Spinner],
  templateUrl: './my-profile-page.html',
  styleUrl: './my-profile-page.scss',
})
export class MyProfilePage implements OnInit
{
    private readonly _auth = inject(AuthService);
    //private readonly _user = inject(UserS)
    myProfileDetails: UserDetails|null = null;
    isAddressHidden: boolean = true;
    
    async ngOnInit(): Promise<void> {
        this.myProfileDetails = await this._auth.getOwnProfile();
    }

    onAddressVisibility()
    {
        this.isAddressHidden = !this.isAddressHidden;
    }
}
