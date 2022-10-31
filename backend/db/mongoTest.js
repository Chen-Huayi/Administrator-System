const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/mongo_use')

mongoose.connection.once('open', ()=>{
    console.log('连接成功')
})

const stuSchema=new Schema({
    name: String,
    age: Number,
    gender: {
        type: String,
        default: 'female'
    },
    address: String
})

// Model
const StuModel=mongoose.model('student', stuSchema)
StuModel.create({
    name: '林子焮',
    age: 23,
    gender: 'female',
    address: '温泉公园'
}, (err)=>{
    if (!err){
        console.log('插入成功')
    }
})


mongoose.connection.once('close', ()=>{
    console.log('连接已断开')
})

mongoose.disconnect()

