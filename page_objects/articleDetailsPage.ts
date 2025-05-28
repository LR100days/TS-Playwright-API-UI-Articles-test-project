import { Page, expect } from '@playwright/test';

export class ArticleDetailsPage {
    readonly page: Page
    constructor(page: Page) {
        this.page = page
    }

    


    async editArticleTo(newArticleTitle: string, newArticleDesription: string, newwArticleText: string){
        await this.page.getByRole('link', { name: ' Edit Article' }).first().click();

        const articleTitleField = this.page.getByPlaceholder('Article Title')
        const articleDescriptionField = this.page.getByPlaceholder('What\'s this article about?')
        const articleTextField = this.page.getByPlaceholder('Write your article (in')

        await articleDescriptionField.click();
        await articleDescriptionField.clear();
        await articleDescriptionField.fill(newArticleDesription);
        await articleTextField.click();
        await articleTextField.clear();
        await articleTextField.fill(newwArticleText);
        await articleTitleField.click();
        await articleTitleField.clear();
        await articleTitleField.fill(newArticleTitle);
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

    
    
}