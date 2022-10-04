const express=require('express')
const fs = require('fs');
const app=express()
const channelRouter=require('./router/channelBox')
const articleRouter=require('./router/articleBox')

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

app.use('/api', channelRouter)
app.use('/my', articleRouter)


app.listen(8000, ()=>{
    console.log('api server running at http://localhost:8000')
})
