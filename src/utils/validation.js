const validator = require('validator')

function valideSignUpData(req) {

    const {firstName, lastName, email, password} = req.body

    if(!firstName || !lastName){
        throw new Error("Enter the fieds");
        
    }
    else if(!validator.isEmail(email)){
        throw new Error("Email is Not Valid");
        
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password Is Not Strong");
        
    }

    
}

module.exports = {valideSignUpData}