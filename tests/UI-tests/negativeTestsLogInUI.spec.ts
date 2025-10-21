import { test } from '../../utils/fixtures';
import { LoginPage } from '../../page_objects/loginPage';
import { config } from '../../api-test.config';
import { testDataForNegativeLoginTestCases, testDataForSignInButtonStateValidation } from '../../test_data/negativeTestDataForLoginTests'

test.beforeEach( async({page}) => {
  await page.goto(`${config.baseURL}/login`)
})

// Data Driven Testing, uses test data file from test_data/negativeTestDataForLoginTests.ts
testDataForNegativeLoginTestCases.forEach(({userEmail, password, expectedErrorMessage}) => {
    test(`Error message validation on Login form for username ${userEmail} and password ${password}`, async ({page}) => {
        const onLoginPage = new LoginPage(page)
        await onLoginPage.enterEmail(userEmail)
        await onLoginPage.enterPassword(password)
        await onLoginPage.clickSignInButton()
        await onLoginPage.actualErrorMessageTextIs(expectedErrorMessage)
    })     
})

// Data Driven Testing, uses test data file from test_data/negativeTestDataForLoginTests.ts
testDataForSignInButtonStateValidation.forEach(({userEmail, password, expectedSignInButtonState}) => {
    test(`Verify Sign In button state when username ${userEmail} and password ${password} are entered`, async ({page}) => {
        const onLoginPage = new LoginPage(page)
        await onLoginPage.enterEmail(userEmail)
        await onLoginPage.enterPassword(password)
        await onLoginPage.verifyActualSignInButtonStateIs(expectedSignInButtonState)
    })     
})

test('Verify Sign In button state when data from required fields is removed and entered again', async ({page}) => {
    const onLoginPage = new LoginPage(page)
    await onLoginPage.enterEmail(config.userEmail)
    await onLoginPage.enterPassword(config.userPassword)
    await onLoginPage.verifyActualSignInButtonStateIs(true)
    await onLoginPage.clearField('Email')
    await onLoginPage.verifyActualSignInButtonStateIs(false)
    await onLoginPage.enterEmail(config.userEmail)
    await onLoginPage.verifyActualSignInButtonStateIs(true)
    await onLoginPage.clearField('Password')
    await onLoginPage.verifyActualSignInButtonStateIs(false)
    await onLoginPage.enterPassword(config.userPassword)
    await onLoginPage.verifyActualSignInButtonStateIs(true)
});

