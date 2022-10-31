const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/mongo_use')

mongoose.connection.once('open', ()=>{
    console.log('连接成功')
})

mongoose.connection.once('close', ()=>{
    console.log('连接已断开')
})

mongoose.disconnect()

