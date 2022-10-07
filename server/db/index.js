const mysql = require('mysql')
const fs = require("fs");

const db = mysql.createConnection({
    host: "my-azure-server.mysql.database.azure.com",
    user: "chenhuayi",
    password: "0131)!#!Wyy",
    database: "react-db",
    port: 3306,
    // ssl: {ca: fs.readFileSync("{ca-cert filename}")}
});

// 创建数据库连接对象
// const db = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '0131',
//     database: 'my_server',
// })

module.exports = db
