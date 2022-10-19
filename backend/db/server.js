const mysql = require('mysql')
// const fs = require("fs");

// Create a database connection object
// const db = mysql.createConnection({
//     host: "my-azure-server.mysql.database.azure.com",
//     user: "chenhuayi",
//     password: "0131)!#!Wyy",
//     database: "react-db",
//     port: 3306,
//     // ssl: {ca: fs.readFileSync("{ca-cert filename}")}
// });

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '0131',
    database: 'react-db',
})

module.exports = db
