const joi=require('joi')

const username= joi.string().alphanum().min(3).max(12)
const password=joi.string().pattern(/^[\S]{6,12}$/).required()
const email= joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
const prefix= joi.number().integer().min(1).max(150)
const phone= joi.string().min(10).max(11)
const gender= joi.string()

exports.login={
    body: {
        mobile: username,
        code: password
    }
}

exports.register={
    body: {
        email: email.required(),
        username: username.required(),
        password,
        confirm: joi.ref('password'),
        prefix: prefix.required(),
        phone: phone.required(),
        gender: gender.required()
    }
}

exports.update_userinfo={
    body: {
        username,
        email,
        prefix,
        phone,
        gender
    }
}

exports.update_password={
    body: {
        old_password: password,
        password: joi.not(joi.ref('old_password')).concat(password)
    }

}



