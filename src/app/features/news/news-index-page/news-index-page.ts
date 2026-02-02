import { Component, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { indexNews } from '@core/models';
import { Spinner } from "@components/animation/spinner/spinner";
import { AuthService, NewsService } from '@core/services';
import { TableModule } from "primeng/table";
import { HttpResourceRef } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-news-index-page',
  imports: [RouterLink, Spinner, TableModule, ButtonModule, FormsModule],
  templateUrl: './news-index-page.html',
  styleUrl: './news-index-page.scss',
})
export class NewsIndexPage implements OnInit 
{
    private readonly _auth = inject(AuthService);
    private readonly _news = inject(NewsService);
    private readonly _router = inject(Router);
    hasModeratorRights: boolean = false;
    pageSize:WritableSignal<number>=signal(10);
    newPageSize:number=10;

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

    async changePageSize(size: number)
    {
        this.pageSize.set(size);
        this.newsList = await this._news.getNewsIndex(undefined, this.pageSize());
    }
}
