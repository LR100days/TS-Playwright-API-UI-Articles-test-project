import { test } from '../../utils/fixtures';
import { LoginPage } from '../../page_objects/loginPage';
import { config } from '../../api-test.config';



test.beforeEach( async({page}) => {
  await page.goto(`${config.baseURL}/login`)
})

test.describe("Verify error messages on Log In page", async () => {
    test('Error message validation for invalid password and email', async ({page}) => {
        const onLoginPage = new LoginPage(page)
        await onLoginPage.enterInvalidEmail()
        await onLoginPage.enterInvalidPassword()
        await onLoginPage.clickSignInButton()
        await onLoginPage.verifyErrorMessageText()
        await onLoginPage.verifySignInFormIsShown()
    })

    test('Error message validation for invalid password and valid email', async ({page}) => {
        const onLoginPage = new LoginPage(page)
        await onLoginPage.enterConfiguredValidEmail()
        await onLoginPage.enterInvalidPassword()
        await onLoginPage.clickSignInButton()
        await onLoginPage.verifyErrorMessageText()
        await onLoginPage.verifySignInFormIsShown()
    })

    test('Error message validation for valid password and invalid email', async ({page}) => {
        const onLoginPage = new LoginPage(page)
        await onLoginPage.enterInvalidEmail()
        await onLoginPage.enterConfiguredValidPassword()
        await onLoginPage.clickSignInButton()
        await onLoginPage.verifyErrorMessageText()
        await onLoginPage.verifySignInFormIsShown()
    })

    test('Error message validation for email and password fields when only spaces are entered', async ({page}) => {
        const onLoginPage = new LoginPage(page)
        await onLoginPage.enterOnlySpacesForField('Email')
        await onLoginPage.enterOnlySpacesForField('Password')
        await onLoginPage.clickSignInButton()
        await onLoginPage.verifyErrorMessageText()
        await onLoginPage.verifySignInFormIsShown()
    })

    test('Error message validation for password field when only spaces are entered', async ({page}) => {
        const onLoginPage = new LoginPage(page)
        await onLoginPage.enterConfiguredValidEmail()
        await onLoginPage.enterOnlySpacesForField('Password')
        await onLoginPage.clickSignInButton()
        await onLoginPage.verifyErrorMessageText()
        await onLoginPage.verifySignInFormIsShown()
    })

    test('Error message validation when password for different user is entered', async ({page}) => {
        const onLoginPage = new LoginPage(page)
        await onLoginPage.enterConfiguredValidEmail()
        await onLoginPage.enterPasswordForUser2()
        await onLoginPage.clickSignInButton()
        await onLoginPage.verifyErrorMessageText()
        await onLoginPage.verifySignInFormIsShown()

    })

    test('Error message validation when email for different user is entered', async ({page}) => {
        const onLoginPage = new LoginPage(page)
        await onLoginPage.enterEmailForUser2()
        await onLoginPage.enterConfiguredValidPassword()
        await onLoginPage.clickSignInButton()
        await onLoginPage.verifyErrorMessageText()
        await onLoginPage.verifySignInFormIsShown()

    })

})


test.describe("Verify Sign In button state on Log In page", async () => {
    test('Verify Sign In button state  when email and password fields are empty', async ({page}) => {
        const onLoginPage = new LoginPage(page)
        await onLoginPage.verifySignInButtonIsDisabled(true) 
    })
    
    test('Verify Sign In button state  when valid email is entered and password field is empty', async ({page}) => {
        const onLoginPage = new LoginPage(page)
        await onLoginPage.enterConfiguredValidEmail()
        await onLoginPage.verifySignInButtonIsDisabled(true)
    })

    test('Verify Sign In button state  when email field is empty and valid password is entered', async ({page}) => {
        const onLoginPage = new LoginPage(page)
        await onLoginPage.enterConfiguredValidPassword()
        await onLoginPage.verifySignInButtonIsDisabled(true)
    })

    test('Verify Sign In button state  when valid email and password are entered', async ({page}) => {
        const onLoginPage = new LoginPage(page)
        await onLoginPage.enterConfiguredValidEmail()
        await onLoginPage.enterConfiguredValidPassword()
        await onLoginPage.verifySignInButtonIsDisabled(false)
    })

    test('Verify Sign In button state when data from required fields is removed', async ({page}) => {
        const onLoginPage = new LoginPage(page)
        await onLoginPage.enterConfiguredValidEmail()
        await onLoginPage.enterConfiguredValidPassword()
        await onLoginPage.verifySignInButtonIsDisabled(false)
        await onLoginPage.clearField('Email')
        await onLoginPage.verifySignInButtonIsDisabled(true)
        await onLoginPage.enterConfiguredValidEmail()
        await onLoginPage.verifySignInButtonIsDisabled(false)
        await onLoginPage.clearField('Password')
        await onLoginPage.verifySignInButtonIsDisabled(true)
        await onLoginPage.enterConfiguredValidPassword()
        await onLoginPage.verifySignInButtonIsDisabled(false)
    })

});