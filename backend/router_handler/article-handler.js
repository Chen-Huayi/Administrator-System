const db = require('../db-server')

exports.showChannels=(req, res)=>{
    const sql=`select * from channels`

    db.query(sql, function (err, results) {
        let arr=[]
        for (let i = 0; i < results.length; i++) {
            arr.push(results[i].channel_name)
        }
        res.send({
            channel_name: arr
        })
    })
}

exports.listArticles=(req, res)=>{
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

exports.getArticle=(req, res)=>{
    //const sql=`select * from articles order by id limit ?,1`
    const sql=`select * from articles where id=?`

    db.query(sql, req.params.id, (err, results)=> {
        const item = results[0]

        const attributes={
            id: item.id,
            comment_count: item.comment_count,
            cover: {
                images: [item.cover_images]
            },
            like_count: item.like_count,
            pubdate: item.pubdate,
            read_count: item.read_count,
            status: item.status,
            title: item.title,
            available: item.available
        }

        res.send({
            articles: attributes
        })
    })

}

exports.uploadArticle=(req, res)=>{
    const sql = `insert into articles set ?`

    const articleInfo={
        cover_images: ''+req.body.cover.images,
        pubdate: new Date().toLocaleString(),
        title: req.body.title,
        content: req.body.content
    }

    db.query(sql, articleInfo, (err, results)=>{
        if (results.affectedRows!==1){
            return res.msg('GG')
        }
        res.send('ok')
    })

}

exports.deleteArticle=(req, res)=>{
    const sql = `update articles set available=0 where id=?`

    db.query(sql, req.params.id, (err, results)=>{
        if (results.affectedRows!==1){
            return res.msg('GG')
        }
        res.send('ok')
    })
}

exports.updateArticle=(req, res)=>{
    //const sql=`update articles set ? where id=?`
    const sql=`update articles set pubdate=?, title=?, content=?, cover_images=? where id=?`
    const body=req.body

    db.query(sql, [new Date().toLocaleString(), body.title, body.content, body.cover.images, req.params.id], (err, results)=>{
        if (results.affectedRows!==1){
            return res.msg('GG')
        }
        res.send('ok')
    })

}
