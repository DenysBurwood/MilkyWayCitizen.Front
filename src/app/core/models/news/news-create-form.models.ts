export interface CreateNews
{
    title: string;
    text: string;
    description: string;
    publishDate: Date;
    pictures: string[];
    tags: string[];
}