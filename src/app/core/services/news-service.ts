import { HttpClient, HttpParams, httpResource } from '@angular/common/http';
import { inject, Injectable, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreateNews, indexNews, NewsDetails } from '@core/models';
import { environment } from '@env';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NewsService// implements OnChanges
{
    private readonly _http = inject(HttpClient);
    private readonly _activeRoute = inject(ActivatedRoute);
    //console.log(httpResource(() => ({url: environment.apiUrl + "News/index"})));
    //params = new HttpParams().set("pageNumber","0").set("pageSize", "10").set("tags","");// {pageNumber:0, pageSize:10, tags:null};
    temp = httpResource<indexNews>(() => ({ url: environment.apiUrl + "News/index"//, params:pageSize()
        //method:"GET",
        //params:
        //{ params }
        }))
        
        async getNewsIndex(pageNumber: number=0, pageSize:number=10)//:Promise<indexNews[]>
        {
        //this._activeRoute.
        const params=new HttpParams().set("pageSize", pageSize)
        return firstValueFrom(this._http.get<indexNews[]>(environment.apiUrl + "News/index",  { params } ));
    }
    async getNewsDetails(id:number)
        {
        return firstValueFrom(this._http.get<NewsDetails>(environment.apiUrl + "News/details/"+id));
    }
    async createNews(form: CreateNews)
    {
        console.log(form.publishDate);
        
        //return firstValueFrom(this._http.post<CreateNews>(environment.apiUrl + "News/add", form));
        //return this._httpR.post(environment.apiUrl + "News/add", form).pipe().subscribe();
        return this._http.post<void>(environment.apiUrl + "News/add", form).pipe().subscribe();
    }
}
