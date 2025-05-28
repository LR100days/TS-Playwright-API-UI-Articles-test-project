import { Page, expect } from '@playwright/test';

export class ArticlesListPage {
    readonly page: Page
    constructor(page: Page) {
        this.page = page
    }

    async clickCreateNewArticleButton(){
        await this.page.getByRole('link', { name: 'New Article' }).click();
    }

    async selectTheFirstArticleInTheList(){
        await this.page.getByRole('heading').first().click()
    }

    async verifyFirstArticleInTheListHasTitle(articleTitle: string){
        await this.page.waitForSelector('h1');
        await expect ((this.page.getByRole('heading')).first()).toHaveText(articleTitle);
    }
    
    async verifyThatArticleIsNotInTheListByTitle( articleTitle: string){
        await expect (this.page.getByRole('link', { name: articleTitle })).toBeHidden();
    }
    
    async verifyFirstArticleInTheListHasDescription(articleTitle: string){
        await this.page.waitForSelector('p');
        await expect(this.page.locator('p').first()).toHaveText(articleTitle);
    }

    async verifyFirstArticleTagsAre(articleTags: any){
        //To be done
    }

}