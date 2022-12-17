const db = require('../db/server')
const jwt = require('jsonwebtoken')
const config = require('../config')
const bcrypt=require('bcryptjs')

exports.login=(req, res)=>{
    const userinfo = req.body
    const sql=`select * from users where username=?`

    db.query(sql, userinfo.username, (err, results)=>{
        if (err) {
            return res.msg(err)
        }
        if (results.length !== 1) {  // no such result found
            return res.msg('Wrong username!')
        }

        // Check and match password between database
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if (!compareResult){  // userinfo.password NOT EQUAL TO results[0].password
            return res.msg('Wrong password!')
        }

        const user = { ...results[0], password: ''}  // hide password in transmission

        const tokenStr = jwt.sign(
            user,
            config.jwtSecretKey,
            {expiresIn: config.expiresIn}
        )
        res.send({
            status: 0,
            username: userinfo.username,
            token: 'Bearer '+tokenStr
        })
    })

}

exports.register=(req, res)=>{
    const userinfo = req.body
    const sql = `select * from users where username=?`

    db.query(sql, [userinfo.username], (err, results)=>{
        if (results.length > 0) {  // Already exist this username
            return res.msg('User name is occupied!')
        }

        userinfo.password=bcrypt.hashSync(userinfo.password, 7)

        const sql=`insert into users set ?`
        // Insert information form
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

exports.getProfile=(req, res)=>{
    const sql=`select * from users where username=?`  // Get current user information

    db.query(sql, req.params.username, (err, results)=>{
        if (err){
            return res.msg(err)
        }
        if (results.length!==1){  // Fail / Not found
            return res.msg('Load profile failure')
        }
        res.send({
            name: results[0].username,
            email: results[0].email,
            prefix: results[0].phone.split(' ')[0],
            phone: results[0].phone.split(' ')[1],
            gender: results[0].gender
        })
    })

}

exports.updateUserInfo=(req, res)=>{
    // Updated by given new information
    const sql=`select * from users where username=?`
    const currentUsername=req.body.username

    db.query(sql, currentUsername, (err, results)=>{
        const updateReq = req.body
        const {prefix, ...rest} = updateReq
        const newInfo = updateReq.phone ? {...rest, phone: '+'+updateReq.prefix+' '+updateReq.phone} : {...rest}
        const id = results[0].id
        const sql =`update users set ? where id=?`

        db.query(sql, [newInfo, id], (err, results)=>{
            if (results.affectedRows !== 1){
                return res.msg('Fail to update!')
            }
        })
        res.msg('Update successfully!', 0)   // Update successfully
    })
}

exports.updatePassword=(req, res)=>{
    const oldPassword=req.body.old_password
    const username=req.body.username
    const sql=`select * from users where username=?`

    db.query(sql, username, (err, results)=>{
        // Determine if the submitted old password is correct
        const compareResult = bcrypt.compareSync(oldPassword, results[0].password)
        if (!compareResult) {  // oldPassword NOT EQUAL TO results[0].password
            return res.msg('The old password is wrong!')
        }
        const sql=`update users set password=? where username=?`
        const newPassword = bcrypt.hashSync(req.body.password, 7)

        db.query(sql, [newPassword, username], (err, results)=>{
            if (results.affectedRows !== 1)
                return res.msg('Fail to update password!')
            res.msg('Reset password successfully!', 0)
        })
    })

}
