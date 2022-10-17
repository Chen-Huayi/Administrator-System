const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const {get_article, add_article, update_article, delete_article} = require('../schema/article-schema')
const articleHandler = require('../router_handler/article-handler')

// http://localhost:8000/my
router.get('/channel', articleHandler.showChannels)

router.get('/article', articleHandler.listArticles)

router.get('/article/:id', expressJoi(get_article), articleHandler.getArticle)

router.post('/add', expressJoi(add_article), articleHandler.uploadArticle)

router.get('/delete/:id', expressJoi(delete_article), articleHandler.deleteArticle)

router.put('/article/:id', expressJoi(update_article), articleHandler.updateArticle)

module.exports = router

