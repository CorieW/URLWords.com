const mysql = require("mysql2")

const connection = process.env.NODE_ENV === "production" ? 
    mysql.createConnection({
        host: 'database.urlwords.dreamhosters.com',
        database: 'urlwords_db',
        user: 'corwat3dreamhost',
        password: 'wtqLUw2v'
    }) :
    mysql.createConnection({
        host: 'localhost',
        database: 'urlwords',
        user: 'root',
        port: 3306
    })

connection.connect()

module.exports = connection