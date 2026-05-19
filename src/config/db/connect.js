const mysql = require('mysql2');
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

console.log('Attempting to connect to database at:', {
    host: process.env.MYSQLHOST || process.env.MYSQL_HOST || process.env.DATABASE_HOST,
    user: process.env.MYSQLUSER || process.env.MYSQL_USER || process.env.DATABASE_USER,
    database: process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE || process.env.DATABASE,
    port: process.env.MYSQLPORT || process.env.MYSQL_PORT || process.env.DATABASE_PORT || 3306
});

db.connect(function (err) {
    if (err) {
        console.error('Database connection failed:', err.message);
        // Không throw err để tránh app crash liên tục
    } else {
        console.log('You are already connected to the database');
        // Disable ONLY_FULL_GROUP_BY for this session to fix ER_WRONG_FIELD_WITH_GROUP errors
        db.query("SET SESSION sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))", (err) => {
            if (err) {
                console.error('Failed to disable ONLY_FULL_GROUP_BY:', err.message);
            } else {
                console.log('Successfully disabled ONLY_FULL_GROUP_BY session mode.');
            }
        });
    }
})

module.exports = db;