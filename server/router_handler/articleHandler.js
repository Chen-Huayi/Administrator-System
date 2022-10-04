const db = require('../db/index')

exports.showArticles=(req, res)=>{
    const sql=`select * from articles where available=1`

    db.query(sql, function (err, results) {
        let articles=[]
        for (let i = 0; i < results.length; i++) {
            let attributes={
                id: results[i].id,
                comment_count: results[i].comment_count,
                cover: {
                    images: [results[i].cover_images]
                },
                like_count: results[i].like_count,
                pubdate: results[i].pubdate,
                read_count: results[i].read_count,
                status: results[i].status,
                title: results[i].title
            }
            articles.push(attributes)
        }

        res.send({
            size: results.length,
            articles
        })
    })
}

exports.uploadArticle=(req, res)=>{
    const sql = `insert into articles set ?`

    const articleInfo={
        cover_images: '\''+req.body.cover.images+'\'',
        pubdate: new Date(),
        title: req.body.title,
        content: req.body.content
    }

    db.query(sql, articleInfo, (err, results)=>{
        if (results.affectedRows!==1){
            return res.send('GG')
        }
        res.send('ok')
    })

}

