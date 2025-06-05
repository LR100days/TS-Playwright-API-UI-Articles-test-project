import { test } from '../../utils/fixtures';
import { expect } from '../../utils/custom-expect'
import { lengthValidationForUsername, lengthValidationForPassword } from '../../test_data/negativeTestsForLoginTestData'

lengthValidationForUsername.forEach(({username, usernameErrorMessage}) => {
    test(`Error message validation for username length ${username}`, async({api}) => {
        const actualUserName = typeof username === 'function' ? username() : username;
        const newUserResponse = await api
            .path('/users')
            . body({
                "user":{
                    "email": "d",
                    "password": "d",
                    "username": actualUserName
                }
            })
            .clearAuth()
            .postRequest(422)

        if(actualUserName.length == 3 || actualUserName.length == 20){
            expect(newUserResponse.errors).not.toHaveProperty('username')
        } else{
            expect(newUserResponse.errors.username[0]).shouldEqual(usernameErrorMessage)
        }
        
    })

})

lengthValidationForPassword.forEach(({password, passwordErrorMessage}) => {
    test(`Error message validation for password length ${password}`, async({api}) => {
        const actualPassword = typeof password === 'function' ? password() : password;
        const newUserResponse = await api
            .path('/users')
            . body({
                "user":{
                    "email": "d",
                    "password": actualPassword,
                    "username": "d"
                }
            })
            .clearAuth()
            .postRequest(422)

        if(actualPassword.length == 8 || actualPassword.length == 20){
            expect(newUserResponse.errors).not.toHaveProperty('password')
        } else{
            expect(newUserResponse.errors.password[0]).shouldEqual(passwordErrorMessage)
        }
        
    })

});


