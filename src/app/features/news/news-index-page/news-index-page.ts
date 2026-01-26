import { Component, inject, OnInit } from '@angular/core';
import { NewsService } from '@core/services/news-service';
import { Router, RouterLink } from "@angular/router";
import { indexNews } from '@core/models';
import { Spinner } from "@components/animation/spinner/spinner";
import { AuthService } from '@core/services/auth-service';

@Component({
  selector: 'app-news-index-page',
  imports: [RouterLink, Spinner],
  templateUrl: './news-index-page.html',
  styleUrl: './news-index-page.scss',
})
export class NewsIndexPage implements OnInit 
{
    private readonly _auth = inject(AuthService);
    private readonly _news = inject(NewsService);
    private readonly _router = inject(Router);
    hasModeratorRights: boolean = false;

    newsList: indexNews[] = [];
    async ngOnInit(): Promise<void> 
    {
        this.newsList = await this._news.getNewsIndex();
        if (this._auth.role()==="admin" || this._auth.role()==="moderator")
        {
            this.hasModeratorRights=true;
        }
    }

    goToNewsDetails(id: number)
    {
        this._router.navigate(["/", "news", "details", id]);
    }

}
