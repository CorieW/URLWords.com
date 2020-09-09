const mysql = require("mysql2")

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'urlwords',
    user: 'root',
    port: 3306
})

connection.connect()

module.exports = connection