const mysql = require('mysql');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dotenv = require("dotenv").config();

const db = mysql.createConnection({
    host: process.env.MYSQLHOST || process.env.MYSQL_HOST || process.env.DATABASE_HOST,
    user: process.env.MYSQLUSER || process.env.MYSQL_USER || process.env.DATABASE_USER,
    password: process.env.MYSQLPASSWORD || process.env.MYSQL_PASSWORD || process.env.DATABASE_PASSWORD,
    database: process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE || process.env.DATABASE,
    port: process.env.MYSQLPORT || process.env.MYSQL_PORT || process.env.DATABASE_PORT || 3306
})

db.connect(function (err) {
    if (err) {
        throw err;
    } else {
        console.log('You are already connected to the database')
    }
})

module.exports = db;