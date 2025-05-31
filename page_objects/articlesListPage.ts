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
        await this.page.waitForSelector('.sidebar')
        await expect (this.page.getByRole('link', { name: articleTitle })).not.toBeVisible();
    }
    
    async verifyFirstArticleInTheListHasDescription(articleTitle: string){
        await this.page.waitForSelector('p');
        await expect(this.page.locator('p').first()).toHaveText(articleTitle);
    }

    async verifyTagsForArticleAre(articleTags: any, articleTitle: string){
        let expectedSortedListOfTags = articleTags.sort()
        const tagsList = (await this.page.getByRole('link', { name: articleTitle }).locator('.tag-list li').allTextContents()).map(tag => tag.trim());

        let actualSortedTagsList = tagsList.sort()
        expect(actualSortedTagsList).toEqual(expectedSortedListOfTags)
    }

    async verifyThatHomePageIsShown(){
        await expect(this.page.getByRole('link', { name: 'Home' })).toBeVisible()
        await expect(this.page.getByText('Your Feed')).toBeVisible()
    }

}