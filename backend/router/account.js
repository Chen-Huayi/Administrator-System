const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const {register, login, update_userinfo, update_password} =require('../schema/account-schema')
const accountHandler = require('../router_handler/account-handler')

// http://localhost:8000/api
router.post('/login', expressJoi(login), accountHandler.login)

router.post('/register', expressJoi(register), accountHandler.register)

router.get('/profile', accountHandler.profile)

router.put('/profile', accountHandler.exit)

router.post('/updateinfo', expressJoi(update_userinfo), accountHandler.updateUserInfo)

router.post('/updatepwd', expressJoi(update_password), accountHandler.updatePassword)

module.exports = router
