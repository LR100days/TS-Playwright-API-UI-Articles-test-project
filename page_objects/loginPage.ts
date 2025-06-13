import  { Page, expect } from '@playwright/test';
import { config } from '../api-test.config';


export class LoginPage {
    readonly page: Page
    constructor(page: Page) {
        this.page = page    
    }

    async loginWithValidCredentials(){
        await this.page.getByPlaceholder('Email').fill(config.userEmail)
        await this.page.getByPlaceholder('Password').fill(config.userPassword)
        await this.page.getByRole('button', { name: 'Sign in' }).click();
    }

    async enterConfiguredValidEmail(){
        await this.page.getByPlaceholder('Email').fill(config.userEmail)
    }

    async enterConfiguredValidPassword(){
        await this.page.getByPlaceholder('Password').fill(config.userPassword)
    }

    async clickSignInButton(){
        await this.page.getByRole('button', { name: 'Sign in' }).click();
    }

    async enterInvalidEmail(){
        await this.page.getByPlaceholder('Email').fill('a')
    }

    async enterInvalidPassword(){
        await this.page.getByPlaceholder('Password').fill('1')
    }

    async verifyErrorMessageIs(errorMessage: string){
        await expect(this.page.locator('.error-messages li')).toHaveText(errorMessage)
    }

    async verifySignInButtonIsDisabled(buttonState: boolean){
        if(buttonState==true){
            await expect(this.page.getByRole('button', { name: 'Sign in' })).toBeDisabled()
        } else{
            await expect(this.page.getByRole('button', { name: 'Sign in' })).toBeEnabled()}
        
    }

    async verifySignInFormIsShown(){
        expect(this.page.locator('h1')).toHaveText('Sign in')
    }

    async clearField(fieldName: string){
        await this.page.getByPlaceholder(fieldName).clear()
    }

    async enterOnlySpacesForField(fieldName: string){
        await this.page.getByPlaceholder(fieldName).fill('        ')
    }

    async enterPasswordForUser2(){
        await this.page.getByPlaceholder('Password').fill(config.anotherUser2Password)
    }

    async enterEmailForUser2(){
        await this.page.getByPlaceholder('Email').fill(config.anotherUser2Email)
    }

    

    


    

}