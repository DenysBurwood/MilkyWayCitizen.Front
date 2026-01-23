import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsDetails } from '@core/models';
import { NewsService } from '@core/services/news-service';
import { Spinner } from "@components/animation/spinner/spinner";

@Component({
  selector: 'app-news-details-page',
  imports: [Spinner],
  templateUrl: './news-details-page.html',
  styleUrl: './news-details-page.scss',
})
export class NewsDetailsPage 
{
    private readonly _news = inject(NewsService);
    private readonly _route = inject(ActivatedRoute);
    idNews!: number;
    articleDetail: NewsDetails|null = null;
    async ngOnInit(): Promise<void> 
    {
        this._route.params.subscribe(params => {
        const id = params['id'] as number;
        this.idNews=id;
    });
        this.articleDetail=await this._news.getNewsDetails(this.idNews);
    }
}
