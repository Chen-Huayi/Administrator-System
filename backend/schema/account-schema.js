const joi=require('joi')

const username= joi.string().alphanum().min(3).max(12).required()
const password=joi.string().pattern(/^[\S]{6,12}$/).required()
const email= joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
const prefix= joi.number().integer().min(1).max(150).required()
const phone= joi.string().min(10).max(11).required()
const gender= joi.string().required()

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
        prefix,
        phone,
        gender
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
