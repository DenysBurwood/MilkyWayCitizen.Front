export interface CreateNews
{
    title: string;
    text: string;
    description: string;
    publishDate: Date;
    userID: number;
    pictures: string[];
    tags: string[];
}