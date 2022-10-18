const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const {get_article, add_article, update_article, delete_article} = require('../schema/article-schema')
const articleHandler = require('../router_handler/article-handler')
const fs = require("fs");
const channelPath ='./db/channels.json'

// http://localhost:8000/my
try {
    const file = fs.readFileSync(channelPath, 'utf8');
    const channelList = JSON.parse(file);
    router.get('/channel', (req, res)=> {res.json(channelList)})
    // router.get('/channel', articleHandler.showChannels)
}catch (err){
    console.log(`Error reading file from disk: ${err}`);
}

router.get('/article', articleHandler.listArticles)

router.get('/article/:id', expressJoi(get_article), articleHandler.getArticle)

router.post('/add', expressJoi(add_article), articleHandler.uploadArticle)

router.get('/delete/:id', expressJoi(delete_article), articleHandler.deleteArticle)

router.put('/article/:id', expressJoi(update_article), articleHandler.updateArticle)

module.exports = router

