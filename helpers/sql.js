// get the client
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// create the connection to database
const sql = mysql.createConnection({
    host: process.env.HOSTNAME,
    user: process.env.USERNAME,
    database: process.env.DATABASE,
});

module.exports = sql;