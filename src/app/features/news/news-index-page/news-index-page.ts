import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { indexNews } from '@core/models';
import { Spinner } from "@components/animation/spinner/spinner";
import { AuthService, NewsService } from '@core/services';
import { TableModule } from "primeng/table";
import { HttpResourceRef } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-news-index-page',
  imports: [RouterLink, Spinner, TableModule, ButtonModule],
  templateUrl: './news-index-page.html',
  styleUrl: './news-index-page.scss',
})
export class NewsIndexPage implements OnInit 
{
    private readonly _auth = inject(AuthService);
    private readonly _news = inject(NewsService);
    private readonly _router = inject(Router);
    hasModeratorRights: boolean = false;

    //newsListPromise!: Promise<HttpResourceRef<indexNews[] | undefined>>;
    newsList!: indexNews[];
    async ngOnInit()//: Promise<void> 
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
