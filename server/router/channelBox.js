const express = require('express')
const router = express.Router()

// 导入用户路由处理函数模块
const channelHandler = require('../router_handler/channelHandler')


// http://localhost:8000/api
router.get('/channel', channelHandler.showChannels)

module.exports = router
