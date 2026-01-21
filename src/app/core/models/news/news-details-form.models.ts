export interface NewsDetails
{
    id: number;
    title: string;
    text: string;
    publishTime: Date;
    authorId: number
    authorName: string;
    pictures: string[];
    tags: string[];
}