import  { Page, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page
    constructor(page: Page) {
        this.page = page    
    }

    async enterEmail(email: string){
        await this.page.getByPlaceholder('Email').fill(email)
    }

    async enterPassword(password: string){
        await this.page.getByPlaceholder('Password').fill(password)
    }

    async clickSignInButton(){
        await this.page.getByRole('button', { name: 'Sign in' }).click();
    }

    async actualErrorMessageTextIs(errorMessage: string){
        await expect(this.page.locator('.error-messages li')).toHaveText(errorMessage)
        
    }

    async verifyActualSignInButtonStateIs(buttonState: boolean){
        if(buttonState==true){
            await expect(this.page.getByRole('button', { name: 'Sign in' })).toBeEnabled()
        } else{
            await expect(this.page.getByRole('button', { name: 'Sign in' })).toBeDisabled()}
        
    }

    async clearField(fieldName: string){
        await this.page.getByPlaceholder(fieldName).clear()
    }
}