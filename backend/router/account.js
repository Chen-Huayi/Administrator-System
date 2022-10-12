const express = require('express')
const router = express.Router()

const accountHandler = require('../router_handler/account-handler')

// http://localhost:8000/api
router.post('/login', accountHandler.login)

router.post('/register', accountHandler.register)

router.get('/profile', accountHandler.profile)

router.put('/profile', accountHandler.exit)

router.post('/updateinfo', accountHandler.updateUserInfo)

router.post('/updatepwd', accountHandler.updatePassword)

module.exports = router
