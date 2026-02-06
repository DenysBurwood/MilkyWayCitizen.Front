import { HttpClient, HttpParams, httpResource, HttpResourceRef, HttpResponse } from '@angular/common/http';
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
    //params=new HttpParams().set("pageNumber", 1);
    //temp = httpResource<indexNews[]>(() => ({ url: environment.apiUrl + "News/index",params:{pageSize: 3,pageNumber: 1}//, params:pageSize()
        //method:"GET",
        //params: {params} 
        //}))
        //temp3 = httpResource<indexNews[]>(() => ({ url: environment.apiUrl + "News/index",params:this.params}))
        
        getNewsIndex(pageNumber: number=0, pageSize:number=10, tags: string[]|null=null)//:HttpResourceRef<indexNews[]|undefined>
        {
        //this._activeRoute.
        //const params=new HttpParams().set("pageNumber", pageNumber).set("pageSize", pageSize)//.set("tags", tags[0]);
        let params=null;
        if (tags!=null)
        {
            params=new HttpParams().set("pageNumber", pageNumber).set("pageSize", pageSize).appendAll({"tags": tags});
        }
        else
        {
            params=new HttpParams().set("pageNumber", pageNumber).set("pageSize", pageSize)
        }
        //console.log(params);
        
        
        //const params=new HttpParams().set("pageNumber", 0);
        //console.log("Apparition !");
        
        //console.log(params);
        //this.temp3 = httpResource<indexNews[]>(() => ({ url: environment.apiUrl + "News/index",params:this.params}))
        //this.params=this.params.set("pageSize", pageSize);
        //const temp2=httpResource<indexNews[]>(() => ({ url: environment.apiUrl + "News/index",params:{pageNumber: 1}}));
        //const temp2 = httpResource.arrayBuffer<indexNews[]>(() => ({url: environment.apiUrl+"News/index", method: "GET", params: params}))
        //return httpResource<indexNews[]>(() => ({ url: environment.apiUrl + "News/index",params:{pageSize: 3,pageNumber: 1}}))
        //return temp2;
        return firstValueFrom(this._http.get<indexNews[]>(environment.apiUrl + "News/index",  { params } ));
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
        const params=new HttpParams().set("pageSize", pageSize);
        return Math.ceil(await firstValueFrom(this._http.get<number>(environment.apiUrl + "News/pageNumberMax", { params }))/pageSize);
    }
}
