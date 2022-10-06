const db = require('../db/index')
const jwt = require('jsonwebtoken')
const config = require('../config')


exports.login=(req, res)=>{
    const userinfo = req.body
    const sql=`select * from users where username=?`

    db.query(sql, userinfo.mobile, (err, results)=>{
        if (err)
            return res.msg(err)

        if (results.length !== 1)
            return res.msg('Wrong username!')

        if (userinfo.code!==results[0].password)
            return res.msg('Wrong password!')

        const user = { ...results[0], password: ''}

        const sql=`insert into login_history (username) values (?)`
        db.query(sql, userinfo.mobile, (err2, results2)=>{})

        const tokenStr = jwt.sign(
            user,
            config.jwtSecretKey,
            {expiresIn: config.expiresIn}
        )
        res.send({
            status: 0,
            token: 'Bearer '+tokenStr
        })
    })

}

exports.profile=(req, res)=>{
    const sql=`select username from login_history`

    db.query(sql, (err, results)=>{
        if (err){
            return res.msg(err)
        }
        if (results.length!==1){
            return res.msg('Load profile failure')
        }
        res.send({
            name: results[0].username
        })
    })

}

exports.exit=(req, res)=>{
    const sql=`delete from login_history`

    db.query(sql, (err)=>{
        if (err){
            return res.msg(err)
        }
        res.send('ok')
    })

}
