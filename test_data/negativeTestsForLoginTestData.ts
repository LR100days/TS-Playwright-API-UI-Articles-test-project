import { faker } from '@faker-js/faker'


export const lengthValidationForUsername = [
    { username: '', usernameErrorMessage: "can't be blank"},
    { username: `${faker.string.alphanumeric(2)}`, usernameErrorMessage: 'is too short (minimum is 3 characters)'},
    { username: 'ddd', usernameErrorMessage: ''},
    { username: 'dddddddddddddddddddd', usernameErrorMessage: ''},
    { username: 'dddddddddddddddddddds', usernameErrorMessage: 'is too long (maximum is 20 characters)'}

]

export const lengthValidationForPassword = [
    { password: '', passwordErrorMessage: "can't be blank"},
    { password: 'fffffff', passwordErrorMessage: 'is too short (minimum is 8 characters)'},
    { password: 'fffffffj', passwordErrorMessage: ''},
    { password: 'fddddddddddddddddddf', passwordErrorMessage: ''},
    { password: 'ddddddddddddddddddddf', passwordErrorMessage: 'is too long (maximum is 20 characters)'}

]

