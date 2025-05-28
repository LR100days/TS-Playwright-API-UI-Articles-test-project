import { Page, expect } from '@playwright/test';

export class ArticlesListPage {
    readonly page: Page
    constructor(page: Page) {
        this.page = page
    }

    async createArticle(articleTitle: string, articleDescription: string, articleText: string, articleTags: any){
        const articleTagsString = articleTags.toString()

        await this.page.getByRole('link', { name: 'New Article' }).click();
        await this.page.getByPlaceholder('Article Title').fill(articleTitle);
        await this.page.getByPlaceholder('What\'s this article about?').fill(articleDescription);
        await this.page.getByPlaceholder('Write your article (in').fill(articleText);
        await this.page.getByPlaceholder('Enter tags').fill(articleTagsString);
        await this.page.getByRole('button', { name: 'Publish Article' }).click();
    }

    async selectTheFirstArticleInTheListBy(articleTitle: string){
        await this.page.getByRole('link', { name: articleTitle }).click();
    }

    async verifyArticleIsShownInTheListByTitle(articleTitle: string){
        await this.page.waitForSelector('h1');
        await expect ((this.page.getByRole('heading')).first()).toHaveText(articleTitle);
    }
    
    async verifyThatArticleIsNotInTheListByTitle( articleTitle: string){
        await expect (this.page.getByRole('link', { name: articleTitle })).toBeHidden();
    }
    
}