/* var pg = require('pg');

var conString = "postgres://postgres:harits2804@localhost:5432/flask_db";

var client = new pg.Client(conString);
await client.connect()
var query = await client.query("SELECT * FROM user_db;");
//fired after last row is emitted

query.rows.forEach(row => {
    console.log(row)
})

await client.end */
/*
var pg = require("pg");

var connectionString = {
  user: 'postgres',
  host: 'localhost',
  database: 'flask_db',
  password: 'harits2804',
  port: 5432,
};

var pool = new pg.Pool(connectionString);

pool.connect(function(err, client, done) {

    const query = client.query(new pg.Query("SELECT * from user_db WHERE username='admin'"))
    query.on('row', function (res) {
        console.log(res.rowCount)
    })
    query.on('end', function (res) {
        pool.end()
        console.log(res.rowCount)
    })
    query.on('error', (res) => {
        console.log(res);
    })

    done()
}) */


var pg = require("pg");

var connectionString = {
  user: 'postgres',
  host: 'localhost',
  database: 'flask_db',
  password: 'harits2804',
  port: 5432,
};

const pgcon = new pg.Client(connectionString)
pgcon.connect()
pgcon.query("SELECT * FROM user_db", (err, res) => {
    console.log(res.rowCount)
})


//"SELECT * FROM user_db WHERE username = $1 AND password = $2", [username, password]


