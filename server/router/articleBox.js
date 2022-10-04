const express = require('express')
const router = express.Router()

const articleHandler = require('../router_handler/articleHandler')

// http://localhost:8000/my
router.get('/article', articleHandler.showArticles)

router.post('/addArticle', articleHandler.uploadArticle)

router.get('/deleteArticle/:id', articleHandler.deleteArticle)

module.exports = router

