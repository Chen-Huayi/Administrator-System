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

const StuModel=mongoose.model('students', stuSchema)  // Model (collections集合)

// StuModel.create(
//     {name: 'llw', age: 22, gender: 'female', address: '金海园'},
//     (err)=>{ if (!err) console.log('插入成功')}
// )
// StuModel.find({}, {name: 1, _id: 0}, (error, result)=>{
//     if (!error)
//         console.log(result)
// })
// StuModel.updateOne({name: 'szw'}, {$set: {age: 23}}, (err)=>{
//     if (!err)
//         console.log('修改成功')
// })
// StuModel.find({}, 'name age -_id', {skip: 1, limit: 1}, (error, result)=>{
//     if (!error)
//         console.log(result)
//     console.log(result instanceof StuModel)
// })
StuModel.count({}, (error, result)=>{
    if (!error)
        console.log(result)
})












mongoose.connection.once('close', ()=>{console.log('连接已断开')})
// mongoose.disconnect()

