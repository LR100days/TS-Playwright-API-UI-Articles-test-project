import  { Page, expect } from '@playwright/test';
import { config } from '../api-test.config';

const possibleErrorMessagesTextFor = {
    invalidCredentials: 'email or password is invalid',
    blankEmail: `email can't be blank`,
    blankPassword: `password can't be blank`
};

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

    async verifyErrorMessageText(){
        const actualErrorMessageText = (await this.page.locator('.error-messages li').textContent()) 
        if( actualErrorMessageText === possibleErrorMessagesTextFor.invalidCredentials){
          await expect(this.page.locator('.error-messages li')).toHaveText(possibleErrorMessagesTextFor.invalidCredentials)
        } else if (actualErrorMessageText === possibleErrorMessagesTextFor.blankPassword) {
            await expect(this.page.locator('.error-messages li')).toHaveText(possibleErrorMessagesTextFor.blankPassword)
        } else {
            await expect(this.page.locator('.error-messages li')).toHaveText(possibleErrorMessagesTextFor.blankEmail)
        }
        
    }

    async verifySignInButtonIsDisabled(buttonState: boolean){
        if(buttonState==true){
            await expect(this.page.getByRole('button', { name: 'Sign in' })).toBeDisabled()
        } else{
            await expect(this.page.getByRole('button', { name: 'Sign in' })).toBeEnabled()}
        
    }

    async verifySignInFormIsShown(){
        await expect(this.page.locator('h1')).toHaveText('Sign in')
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