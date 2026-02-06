import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateNews } from '@core/models';
import { MessageModule } from 'primeng/message';
import { NewsService } from '@core/services/news-service';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { tag } from '@core/models/tag.models';

@Component({
  selector: 'app-news-create-page',
  imports: [MessageModule, ButtonModule, InputTextModule, ReactiveFormsModule, ToastModule],
  templateUrl: './news-create-page.html',
  styleUrl: './news-create-page.scss',
})
export class NewsCreatePage 
{
    private readonly _news = inject(NewsService);
    private readonly _fb = inject(FormBuilder);
    private readonly _router = inject(Router);
    tagListlength: number=0;
    tagList: string[]=[];
    pluralTags=false;

    title = new FormControl("", [Validators.required]);
    text = new FormControl("", [Validators.required]);
    description = new FormControl("", []);
    publishTime = new FormControl(new Date(Date.now()), [Validators.required]);
    pictures = new FormControl("", [Validators.required]);
    //tags = new FormControl<string[]>([], [Validators.required]);
    //tags = new FormArray([], Validators.required);
    newsGroup = this._fb.group(
    {
        title: this.title,
        text: this.text,
        description: this.description,
        publishTime: this.publishTime,
        pictures: this.pictures,
        tags: this._fb.array<tag[]>([])
        //tags: this.tags
    });    

    async onSubmit()
    {
        let tempArray: string[]=[];
        console.log(typeof(this.newsGroup.value.tags));
        this.newsGroup.value.tags!.forEach(element => {
            if (element!==null)
            {
                tempArray.push(element!.name);
                console.log(element.name);
                
            }
        });
        console.log(tempArray);
        
        if (this.newsGroup.valid)
        {
            const newArticle:CreateNews = 
            {
                title:this.newsGroup.value.title!,
                text:this.newsGroup.value.text!,
                description:this.newsGroup.value.description!,
                publishDate:this.newsGroup.value.publishTime!,
                pictures:[this.newsGroup.value.pictures!],
                tags:tempArray
            };

            
            this._news.createNews(newArticle).then(() => console.log(newArticle.publishDate));
            this._router.navigate(["/", "news"]);
            //console.log(newArticle.publishDate);
            
        }

        
    }
    get tags()
    {
        return this.newsGroup.get("tags") as FormArray
    }
    addTag()
    {
        const tagForm = this._fb.group({
            name: ["", Validators.required]
        });
        this.tags.push(tagForm);
        this.addFilter();
    }
    deleteTag(tagIndex:number)
    {
        this.tags.removeAt(tagIndex);
        this.removeFilter();
    }

    isInvalid(controlName: string) {
        const control = this.newsGroup.get(controlName);
        return control?.invalid && (control.touched/* || this.formSubmitted*/);
    }

    addFilter()
    {
        this.tagListlength++;
        this.tagList.length=this.tagListlength;
        console.log(this.tagListlength);
        this.pluralTags=true;
    }

    removeFilter()
    {
        this.tagListlength--;
        console.log(this.tagListlength);
        this.tagList.length=this.tagListlength;
        if (this.tagListlength<=0)
        {
            this.tagListlength=0;
            this.pluralTags=false;
        }
    }
}
