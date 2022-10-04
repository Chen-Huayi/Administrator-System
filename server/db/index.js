const mysql = require('mysql')

// 创建数据库连接对象
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '0131',
    database: 'my_server',
})

module.exports = db
