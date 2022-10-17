const joi=require('joi')

const username=joi.string().alphanum().min(3).max(12).required()
const password=joi.string().pattern(/^[\S]{6,12}$/).required()
const id=joi.number().integer().min(1).required()
const email=joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
const phone=joi.string().min(10).max(11).required()

exports.login={
    body: {
        mobile: username,
        code: password
    }
}

exports.register={
    body: {
        email,
        username,
        password,
        confirm: joi.ref('password'),
        prefix: joi.number().integer().min(1).max(150),
        phone,
        gender: joi.string()
    }
}

exports.update_userinfo={
    body: {
        username,
        email
    }
}

exports.update_password={
    body: {
        old_password: password,
        password: joi.not(joi.ref('old_password')).concat(password)
    }

}



