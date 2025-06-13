import { faker } from '@faker-js/faker'


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

