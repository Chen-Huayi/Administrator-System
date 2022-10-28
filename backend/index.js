const express=require('express')
const app=express()
const joi = require('joi')
const cors = require('cors')
const config = require('./config')
const expressJWT = require('express-jwt')
const accountRouter=require('./router/account')
const articleRouter=require('./router/article')

app.use(cors())
// app.use(express.urlencoded({ extended: false }))
app.use(express.json())

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
app.use('/api', accountRouter)

app.use('/my', articleRouter)

app.use((err, req, res, next)=>{
    if (err instanceof joi.ValidationError){  // Error caused by failed validation
        return res.msg(err)
    }
    if (err.name === 'UnauthorizedError')  // Middleware error
        return res.msg('Authorization Error!')
    res.msg(err)  // Unknown error
})

app.listen(8000, ()=>{
    console.log('API server is running at http://localhost:8000')
})
