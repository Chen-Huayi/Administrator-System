const db = require('../db/index')
const jwt = require('jsonwebtoken')
const config = require('../config')
const bcrypt=require('bcryptjs')

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

        const sql=`insert into login_history (username, email) values (?, ?)`
        db.query(sql, [user.username, user.email])

        const tokenStr = jwt.sign(
            user,
            config.jwtSecretKey,
            {expiresIn: config.expiresIn}
        )
        res.send({
            status: 0,
            username: userinfo.mobile,
            token: 'Bearer '+tokenStr
        })
    })

}

exports.register=(req, res)=>{
    const userinfo = req.body
    const sql = `select * from users where username=?`

    db.query(sql, [userinfo.username], (err, results)=>{
        if (results.length > 0) {
            return res.msg('User name is occupied!')
        }

        const sql=`insert into users set ?`
        db.query(sql, {
            username: userinfo.username,
            password: userinfo.password,
            email: userinfo.email,
            phone: '+'+userinfo.prefix+' '+userinfo.phone,
            gender: userinfo.gender
        }, (err, results)=>{
            if (results.affectedRows !== 1) {
                return res.msg('Register failure')
            }
            res.msg('Register successfully!', 0)
        })

    })

}

exports.profile=(req, res)=>{
    const sql=`select * from login_history`

    db.query(sql, (err, results)=>{
        if (err){
            return res.msg(err)
        }
        if (results.length!==1){
            return res.msg('Load profile failure')
        }
        res.send({
            name: results[0].username,
            email: results[0].email
        })
    })

}

exports.exit=(req, res)=>{
    const sql=`delete from login_history where id=1`

    db.query(sql, (err)=>{
        if (err){
            return res.msg(err)
        }
        res.send('ok')
    })

}
