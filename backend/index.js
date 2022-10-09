const express=require('express')
const fs = require('fs');
const app=express()
const joi = require('joi')
const config = require('./config')
const expressJWT = require('express-jwt')
const userRouter=require('./router/user')
const articleRouter=require('./router/article')

const cors = require('cors')
app.use(cors())
// app.use(express.urlencoded({ extended: false }))
app.use(express.json())

/*try {
    const file = fs.readFileSync('db/data.json', 'utf8');
    // parse JSON string to JSON object
    const data = JSON.parse(file);

    app.get("/api/channel", (req, res)=> {
        res.json(data[0])
    })

    app.get("/my/article", (req, res)=> {
        res.json(data[1])
    })

    app.get("/api/frameworks", (req, res)=> {
        res.json(data[2])
    })
} catch (err) {
    console.log(`Error reading file from disk: ${err}`);
}*/

app.use((req, res, next)=>{
    res.msg= (err, status=1)=>{
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

// app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))
app.use('/api', userRouter)
app.use('/my', articleRouter)

app.use((err, req, res, next)=>{
    if (err instanceof joi.ValidationError){  // 验证失败导致的错误
        return res.msg(err)
    }
    if (err.name === 'UnauthorizedError')  // 错误中间件
        return res.msg('Authorization Error!')
    res.msg(err)  // Unknown error
})

app.listen(8000, ()=>{
    console.log('API server is running at http://localhost:8000')
})
