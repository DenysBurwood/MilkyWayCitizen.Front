import { Component, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { indexNews } from '@core/models';
import { Spinner } from "@components/animation/spinner/spinner";
import { AuthService, NewsService } from '@core/services';
import { TableModule } from "primeng/table";
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-news-index-page',
  imports: [RouterLink, Spinner, TableModule, ButtonModule, FormsModule, TagModule, ChipModule],
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
    pageNumber:WritableSignal<number>=signal(0);
    newPageSize:number=10;
    newPageNumber=0;
    firstPage:boolean=true;
    lastPage:boolean=true;
    pageMax:number=1;
    filter: boolean=false;
    tagListlength: number=0;
    tagList: string[]=[];
    tagElement: string="";

    //newsListPromise!: Promise<HttpResourceRef<indexNews[] | undefined>>;
    newsList!: indexNews[];
    newsListSignal:Signal<indexNews[]|undefined>|null=null;
    async ngOnInit()//: Promise<void> 
    {
        this.newsList = (await this._news.getNewsIndex())//.value;
        this.pageMax = await this._news.numberPageMax(this.pageSize(), this.tagList);
        if (this.pageNumber()>1)
        {
            this.firstPage=false;
        }
        if(this.pageNumber()<this.pageMax)
        {
            this.lastPage=false;
        }
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
        this.newsList = ((await this._news.getNewsIndex(undefined, this.pageSize(), this.tagList))/*.value*/);
        this.pageMax = await this._news.numberPageMax(this.pageSize(), this.tagList);
        this.pageNumber.set(0);
        this.firstPage=true;
        this.lastPage=false;
        if(this.pageNumber()==this.pageMax-1)
        {
            this.lastPage=true;
        }
    }

    async previousPage()
    {
  
        if (this.pageNumber()>0)
        {
            this.pageNumber.set(this.pageNumber()-1);
            this.newsList = ((await this._news.getNewsIndex(this.pageNumber(), this.pageSize(), this.tagList))/*.value*/);
            this.lastPage=false;
        }
        if (this.pageNumber()>0)
        {
            this.firstPage=false;
        }
        else
        {
            this.firstPage=true;
        }
    }
    async nextPage()
    {
        
        if (this.pageNumber()<this.pageMax-1)
        {
            this.pageNumber.set(this.pageNumber()+1);
            this.newsList = ((await this._news.getNewsIndex(this.pageNumber(), this.pageSize(), this.tagList))/*.value*/);
            this.firstPage=false;
        }
        if (this.pageNumber()<this.pageMax-1)
        {
            this.lastPage=false;
        }
        else
        {
            this.lastPage=true;
        }

    }
    async goToPage(keyboard: any)
    {
        if (keyboard.key=="Enter")
        {
            console.log(keyboard);
            
            if (keyboard.target.value!=="")
            {
                if (keyboard.target.value%1==0)
                {
                    this.pageNumber.set(keyboard.target.value-1);
                    this.newsList = ((await this._news.getNewsIndex(this.pageNumber(), this.pageSize(), this.tagList))/*.value*/);
                }
            }
            else
            {
                console.log("chaine vide");
            }
        }        
    }

    addFilter()
    {
        this.tagListlength++;
        this.tagList.length=this.tagListlength;
        this.filter=true;
    }
    addTag()
    {
        this.tagList.push(this.tagElement);
        this.tagElement="";
    }

    removeFilter(index:number)
    {
        this.tagListlength--;
        console.log(this.tagList);
        this.tagList.splice(index, 1);
        console.log(this.tagList);
        
        if (this.tagListlength<=0)
        {
            this.tagListlength=0;
            this.filter=false;
        }
    }

    async sendFilterRequest()
    {
        console.log(this.tagList);
        
        this.newsList = await this._news.getNewsIndex(this.pageNumber(), this.pageSize(), this.tagList);   
        this.pageMax = await this._news.numberPageMax(this.pageSize(), this.tagList);
        
    }
}
