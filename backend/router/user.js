const express = require('express')
const router = express.Router()

const userHandler = require('../router_handler/userHandler')

// http://localhost:8000/api
router.post('/login', userHandler.login)

router.post('/register', userHandler.register)

router.get('/profile', userHandler.profile)

router.put('/profile', userHandler.exit)

router.post('/userinfo', userHandler.updateUserInfo)

router.post('/updatepwd', userHandler.updatePassword)

module.exports = router
