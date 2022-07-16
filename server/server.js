const express=require('express')
const fs = require('fs');
const app=express()

try {
    const file = fs.readFileSync('db/data.json', 'utf8');
    // parse JSON string to JSON object
    const data = JSON.parse(file);

    app.get("/api/channel", (req, res)=> {
        res.json(data[0])
    })

    app.get("/api/articles", (req, res)=> {
        res.json(data[1])
    })

} catch (err) {
    console.log(`Error reading file from disk: ${err}`);
}

app.listen(8000, ()=>{
    console.log('start on port 8000')
})
