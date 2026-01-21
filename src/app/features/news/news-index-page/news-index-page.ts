import { Component, inject, OnInit } from '@angular/core';
import { indexNews } from '@core/models/news/news-index-form.models';
import { NewsService } from '@core/services/news-service';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-news-index-page',
  imports: [RouterLink],
  templateUrl: './news-index-page.html',
  styleUrl: './news-index-page.scss',
})
export class NewsIndexPage implements OnInit 
{
    private readonly _news = inject(NewsService);
    private readonly _router = inject(Router);

    newsList: indexNews[] = [];
    async ngOnInit(): Promise<void> 
    {
        this.newsList = await this._news.getNewsIndex();
    }

    goToNewsDetails(id: number)
    {
        this._router.navigate(["/", "news", "details", id]);
    }

}
