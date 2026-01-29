import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateNews } from '@core/models';
import { NewsService } from '@core/services/news-service';

@Component({
  selector: 'app-news-create-page',
  imports: [ReactiveFormsModule],
  templateUrl: './news-create-page.html',
  styleUrl: './news-create-page.scss',
})
export class NewsCreatePage 
{
    private readonly _news = inject(NewsService);
    private readonly _fb = inject(FormBuilder);
    private readonly _router = inject(Router);

    title = new FormControl("", [Validators.required]);
    text = new FormControl("", [Validators.required]);
    description = new FormControl("", []);
    publishTime = new FormControl(new Date(Date.now()), [Validators.required]);
    pictures = new FormControl("", [Validators.required]);
    tags = new FormControl("", [Validators.required]);

    newsGroup = this._fb.group(
    {
        title: this.title,
        text: this.text,
        description: this.description,
        publishTime: this.publishTime,
        pictures: this.pictures,
        tags: this.tags
    });    


    async onSubmit()
    {
        if (this.newsGroup.valid)
        {
            const newArticle:CreateNews = 
            {
                title:this.newsGroup.value.title!,
                text:this.newsGroup.value.text!,
                description:this.newsGroup.value.description!,
                publishDate:this.newsGroup.value.publishTime!,
                pictures:[this.newsGroup.value.pictures!],
                tags:[this.newsGroup.value.tags!]
            };
            this._news.createNews(newArticle).then(() => console.log(newArticle.publishDate));
            this._router.navigate(["/", "news"]);
            console.log(newArticle.publishDate);
            
        }
    }
}
