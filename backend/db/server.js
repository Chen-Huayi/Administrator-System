const mysql = require('mysql')

// Create a database connection object
// const db = mysql.createConnection({
//     host: "my-azure-server.mysql.database.azure.com",
//     user: "chenhuayi",
//     password: "0131)!#!Wyy",
//     database: "react-db",
//     port: 3306,
//     // ssl: {ca: fs.readFileSync("{ca-cert filename}")}
// });

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0131!chy',
    database: 'my_db',
    port: 3306,
})
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("MySql Connected")
})

module.exports = db
