import { Page, expect } from '@playwright/test';
import { config } from '../api-test.config';



export class LoginPage {
    readonly page: Page
    constructor(page: Page) {
        this.page = page
    }

    async loginWithValidCredentials(userLogin: string, userPassword: string){
        await this.page.goto(`${config.baseURL}/login`)
        await this.page.getByPlaceholder('Email').fill(userLogin)
        await this.page.getByPlaceholder('Password').fill(userPassword)
        await this.page.getByRole('button', { name: 'Sign in' }).click();
    }

}