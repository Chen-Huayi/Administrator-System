const db = require('../db/index')

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
