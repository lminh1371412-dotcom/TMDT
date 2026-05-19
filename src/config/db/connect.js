const mysql = require('mysql2');
const dotenv = require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT
});

db.connect((err) => {
    if (err) {
        console.log('Database connection failed:', err);
    } else {
        console.log('Connected database');

        db.query("SET SESSION sql_mode = ''", (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('SQL MODE disabled');
            }
        });
    }
});

module.exports = db;