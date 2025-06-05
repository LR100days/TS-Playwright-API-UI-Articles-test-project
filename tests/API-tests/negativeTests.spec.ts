import { test } from '../../utils/fixtures';
import { expect } from '../../utils/custom-expect'
import { lengthValidationForUsername, lengthValidationForPassword } from '../../test_data/negativeTestsForLoginTestData'
import { faker } from '@faker-js/faker'

lengthValidationForUsername.forEach(({username, usernameErrorMessage}) => {
    test(`Error message validation for username ${username}`, async({api}) => {
        const newUserResponse = await api
            .path('/users')
            . body({
                "user":{
                    "email": "d",
                    "password": "d",
                    "username": username
                }
            })
            .clearAuth()
            .postRequest(422)

        if(username.length == 3 || username.length == 20){
            expect(newUserResponse.errors).not.toHaveProperty('username')
        } else{
            expect(newUserResponse.errors.username[0]).shouldEqual(usernameErrorMessage)
        }
        
    })

})

lengthValidationForPassword.forEach(({password, passwordErrorMessage}) => {
    test(`Error message validation for password ${password}`, async({api}) => {
        const newUserResponse = await api
            .path('/users')
            . body({
                "user":{
                    "email": "d",
                    "password": password,
                    "username": "d"
                }
            })
            .clearAuth()
            .postRequest(422)

        if(password.length == 8 || password.length == 20){
            expect(newUserResponse.errors).not.toHaveProperty('password')
        } else{
            expect(newUserResponse.errors.password[0]).shouldEqual(passwordErrorMessage)
        }
        
    })

});

[
    { username: '', usernameErrorMessage: "can't be blank"},
    { username: faker.lorem.sentence(5), usernameErrorMessage: 'is too short (minimum is 3 characters)'},
    { username: 'ddr', usernameErrorMessage: ''},
    { username: 'dddddddddddddddddddu', usernameErrorMessage: ''},
    { username: 'ddddddddddddddddddddg', usernameErrorMessage: 'is too long (maximum is 20 characters)'}

].forEach(({username, usernameErrorMessage}) => {
    test(`Error message validation for faker username ${username}`, async({api}) => {
        const newUserResponse = await api
            .path('/users')
            . body({
                "user":{
                    "email": "d",
                    "password": "d",
                    "username": username
                }
            })
            .clearAuth()
            .postRequest(422)

        if(username.length == 3 || username.length == 20){
            expect(newUserResponse.errors).not.toHaveProperty('username')
        } else{
            expect(newUserResponse.errors.username[0]).shouldEqual(usernameErrorMessage)
        }
        
    })

})

