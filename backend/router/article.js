const express = require('express')
const router = express.Router()

const articleHandler = require('../router_handler/article-handler')

// http://localhost:8000/my
router.get('/channel', articleHandler.showChannels)

router.get('/article', articleHandler.listArticles)

router.get('/article/:id', articleHandler.getArticle)

router.post('/add', articleHandler.uploadArticle)

router.get('/delete/:id', articleHandler.deleteArticle)

router.put('/article/:id', articleHandler.updateArticle)

module.exports = router

