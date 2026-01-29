import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateNews, indexNews, NewsDetails } from '@core/models';
import { environment } from '@env';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService 
{
    private readonly _http = inject(HttpClient);
    
    async getNewsIndex(pageNumber: number=0, pageSize:number=10)//:Promise<indexNews[]>
    {
        //return httpResource.arrayBuffer<indexNews[]>(() => environment.apiUrl + "News/index")
        return firstValueFrom(this._http.get<indexNews[]>(environment.apiUrl + "News/index"));
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
