import { Page, expect } from '@playwright/test';

export class ArticleDetailsPage {
    readonly page: Page
    constructor(page: Page) {
        this.page = page
    }

    async clickEditArticleButton(){
        await this.page.getByRole('link', { name: 'Edit Article' }).first().click();
        await this.page.waitForTimeout(500)   
    }

    async enterNewArticleTitle(articleTitle: string){
        const articleTitleField = this.page.getByPlaceholder('Article Title')
        await articleTitleField.click();
        await articleTitleField.clear();
        await articleTitleField.fill(articleTitle);
    }

    async enterNewArticleDescription(articleDescription: string){
        const articleDescriptionField = this.page.getByPlaceholder('What\'s this article about?')
        await articleDescriptionField.click();
        await articleDescriptionField.clear();
        await articleDescriptionField.fill(articleDescription);
    }

    async enterNewArticleText(articleText: string){
        const articleTextField = this.page.getByPlaceholder('Write your article')
        await articleTextField.click();
        await articleTextField.clear();
        await articleTextField.fill(articleText);
    }

    async enterNewArticleTags(articleTags: any){

        const articleTagsField = this.page.getByPlaceholder('Enter tags')
        await articleTagsField.click();
        await articleTagsField.clear();

        let tagsList = articleTags;
        for (const tagValue of tagsList) {
            await articleTagsField.fill(tagValue);
            await articleTagsField.press('Enter')}
    }

    async verifyArticleTagsAre(articleTags: any){
        let expectedSortedListOfTags = articleTags.sort()
        const tagsList = (await this.page.locator('.tag-list li').allTextContents()).map(tag => tag.trim());

        let actualSortedTagsList = tagsList.sort()
        expect(actualSortedTagsList).toEqual(expectedSortedListOfTags)
    }

    async clickPublishArticleButton(){
        await this.page.getByRole('button', { name: 'Publish Article' }).click();
    }

    async deleteArticleByTitle( articleTitle: string){
        await this.page.getByRole('link', { name: articleTitle }).click();
        await this.page.getByRole('button', { name: 'Delete Article' }).first().click();
    }

    async navigateToArticlesListPage(){
        await this.page.getByRole('navigation').getByRole('link', { name: 'conduit' }).click();
    }

    async verifyArticleTitleIs(articleTitle: string){
        await this.page.waitForSelector('h1');
        await expect(this.page.getByRole('heading')).toHaveText(articleTitle);
    }

    async verifyArticleTextIs(articleText: string){
        await expect(this.page.locator('.col-md-12').locator('div')).toHaveText(articleText)
    }
 
}