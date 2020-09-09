const express = require("express")
const app = express()

const faker = require("faker")

const mysqlConnection = require("./config/database")

app.get("/:urlWords", (req, res) =>
{
    let urlWords = req.params.urlWords.toLowerCase()

    mysqlConnection.query(`SELECT * FROM urls WHERE short_url='${urlWords}'`, (err, rows) =>
    {
        if (err) {
            res.sendStatus(400) // Bad Request
            return
        }

        if (rows.length === 0) {
            res.sendStatus(404)
            return
        }

        res.json("http://" + rows[0].original_url)
    })
})

app.get("/api/urls", (req, res) =>
{
    let url = req.query.url
    let whereQuery = ""
    if (url != undefined) {
        whereQuery = `WHERE original_url='${url}'`
    }
        
    mysqlConnection.query(`SELECT * FROM urls ${whereQuery}`, (err, rows) =>
    {
        res.json(err !== null ? err : rows)
    })
})

app.post("/api/urls", (req, res) =>
{
    let shortUrl = ""
    for (let i = 0; i < 3; i++) {
        shortUrl += faker.random.word().toLowerCase() + "-"
    }
    shortUrl = shortUrl.substring(0, shortUrl.length - 1);
    console.log(req.query.url)

    mysqlConnection.query(`SELECT * FROM urls WHERE original_url='${req.query.url}'`, (err, rows) =>
    {
        if (err) res.sendStatus(400) // Bad Request

        if (rows.length === 0) {
            mysqlConnection.query(`INSERT INTO urls (original_url, short_url) VALUES ('${req.query.url}', '${shortUrl}')`, (err) =>
            {
                if (err) res.sendStatus(400) // Bad Request

                res.json(shortUrl) // OK
            })
        }
        else {
            console.log(rows)
            res.json(rows[0].short_url) // Conflict
        }
    })
})

app.listen(3001)

// Todo
// Todo - Make responsive

//! Some issues I had
//! CORS was disallowing me to redirect the user by sending a GET request from the front to this server and redirecting from the GET request.