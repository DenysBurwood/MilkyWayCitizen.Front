import { HttpClient, HttpParams, httpResource, HttpResourceRef, HttpResponse } from '@angular/common/http';
import { inject, Injectable, OnChanges, signal, Signal, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreateNews, indexNews, NewsDetails } from '@core/models';
import { indexNewsPageMax } from '@core/models/news/news-index-page-max.response';
import { environment } from '@env';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NewsService// implements OnChanges
{
    private readonly _http = inject(HttpClient);
    private readonly _activeRoute = inject(ActivatedRoute);
    private _newsError = signal<string>("");
    newsError = this._newsError.asReadonly();

    getNewsIndex(pageNumber: number=0, pageSize:number=10, tags: string[]|null=null)//:HttpResourceRef<indexNews[]|undefined>
    {
        let params=null;
        if (tags!=null)
        {
            params=new HttpParams().set("pageNumber", pageNumber).set("pageSize", pageSize).appendAll({"tags": tags});
        }
        else
        {
            params=new HttpParams().set("pageNumber", pageNumber).set("pageSize", pageSize)
        }
        return firstValueFrom(this._http.get<indexNewsPageMax>(environment.apiUrl + "News/index",  { params } ));
    }
    async getNewsDetails(id:number)
        {
        return firstValueFrom(this._http.get<NewsDetails>(environment.apiUrl + "News/details/"+id));
    }
    async createNews(form: CreateNews)
    {
        return this._http.post<void>(environment.apiUrl + "News/add", form).pipe().subscribe();
    }
    async numberPageMax(pageSize:number, tags:string[]|null)
    {
        let params=null;
        if (tags!=null)
        {
            params=new HttpParams().set("pageSize", pageSize).appendAll({"tags": tags});
        }
        else
        {
            params=new HttpParams().set("pageSize", pageSize);
        }
        return Math.ceil(await firstValueFrom(this._http.get<number>(environment.apiUrl + "News/pageNumberMax", { params }))/pageSize);
    }

    setNewsError(error:string)
    {
        this._newsError.set(error);
    }
}
