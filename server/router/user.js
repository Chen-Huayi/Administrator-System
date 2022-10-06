const express = require('express')
const router = express.Router()

const userHandler = require('../router_handler/userHandler')

// http://localhost:8000/api
router.post('/login', userHandler.login)

module.exports = router
