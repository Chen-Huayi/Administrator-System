const express = require('express')
const router = express.Router()

const userHandler = require('../router_handler/userHandler')

// http://localhost:8000/api
router.post('/login', userHandler.login)

router.get('/profile', userHandler.profile)

router.put('/profile', userHandler.exit)

module.exports = router
