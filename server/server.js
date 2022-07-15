const express=require('express')
const fs = require('fs');
const app=express()



try {
    const data = fs.readFileSync('db/data.json', 'utf8');
    // parse JSON string to JSON object
    const config = JSON.parse(data);
    console.log(config)

    app.get("/api/channel", (req, res)=> {
        res.json(config[0])
    })



} catch (err) {
    console.log(`Error reading file from disk: ${err}`);
}


app.get("/api/article", (req, res)=>{
    res.json(    {
        'id': '8218',
        'comment_count': 0,
        'cover': {
            'images':['http://geek.itheima.net/resources/images/15.jpg'],
        },
        'like_count': 0,
        'pubdate': '2022-03-11 09:00:00',
        'read_count': 2,
        'status': 2,
        'title': 'wkwebview离线化加载h5资源解决方案'
    })
})



app.listen(5000, ()=>{
    console.log('start on port 5000')
})
