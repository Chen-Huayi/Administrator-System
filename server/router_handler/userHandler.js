const db = require('../db/index')
const jwt = require('jsonwebtoken')
const config = require('../config')


exports.login=(req, res)=>{
    const userinfo = req.body
    const sql=`select * from users where username=?`

    db.query(sql, userinfo.mobile, (err, results)=>{
        if (results.length !== 1)
            return res.msg('Wrong username!')

        if (userinfo.code!==results[0].password)
            return res.msg('Wrong password!')

        const user = { ...results[0], password: ''}

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
