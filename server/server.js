
const express=require('express')
const app=express()

app.get("/api", (req, res)=>{
    res.json({'title': 'Framework', 'framework': ['React', 'vue', 'angular'], 'useRate': [30, 40, 50]})
    // res.json({style :{width: '500px', height: '400px'}})
})

app.get("/api/article", (req, res)=>{
    res.json(    {
        'id': '8218',
        'comment_count': 0,
        // 'cover': {
        //     'images':['http://geek.itheima.net/resources/images/15.jpg'],
        // },
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
