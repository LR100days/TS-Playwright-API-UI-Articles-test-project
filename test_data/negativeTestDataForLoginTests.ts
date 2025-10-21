import { faker } from '@faker-js/faker'
import { config } from '../api-test.config';

export const testDataForNegativeLoginTestCases = [
    { userEmail: '   ', password: config.userPassword, expectedErrorMessage: 'email can\'t be blank'},
    { userEmail: config.userEmail, password: '   ', expectedErrorMessage: 'password can\'t be blank'},
    { userEmail: '   ', password: '   ', expectedErrorMessage:  'email can\'t be blank'},
    { userEmail: 'a', password: '1', expectedErrorMessage: 'email or password is invalid'},
    { userEmail: config.userEmail, password: '2', expectedErrorMessage: 'email or password is invalid'},
    { userEmail: 'b', password: config.userPassword, expectedErrorMessage: 'email or password is invalid'},
    { userEmail: config.userEmail, password: config.anotherUser2Password, expectedErrorMessage: 'email or password is invalid'},
    { userEmail: config.anotherUser2Email, password: config.userPassword, expectedErrorMessage: 'email or password is invalid'},
]

export const testDataForSignInButtonStateValidation = [
    { userEmail: '', password: '', expectedSignInButtonState: false},
    { userEmail: config.userEmail, password: '', expectedSignInButtonState: false},
    { userEmail: '', password: config.userPassword, expectedSignInButtonState: false},
    { userEmail: config.userEmail, password: config.userPassword, expectedSignInButtonState: true},
]

export const lengthValidationForUsername = [
    { username: '', usernameErrorMessage: "can't be blank"},
    { username: () => faker.string.alphanumeric(2), usernameErrorMessage: 'is too short (minimum is 3 characters)'},
    { username: () => faker.string.alphanumeric(3), usernameErrorMessage: ''},
    { username: () => faker.string.alphanumeric(20), usernameErrorMessage: ''},
    { username: () => faker.string.alphanumeric(21), usernameErrorMessage: 'is too long (maximum is 20 characters)'}

]

export const lengthValidationForPassword = [
    { password: '', passwordErrorMessage: "can't be blank"},
    { password: () => faker.string.alphanumeric(7), passwordErrorMessage: 'is too short (minimum is 8 characters)'},
    { password: () => faker.string.alphanumeric(8), passwordErrorMessage: ''},
    { password: () => faker.string.alphanumeric(20), passwordErrorMessage: ''},
    { password: () => faker.string.alphanumeric(21), passwordErrorMessage: 'is too long (maximum is 20 characters)'}

]

