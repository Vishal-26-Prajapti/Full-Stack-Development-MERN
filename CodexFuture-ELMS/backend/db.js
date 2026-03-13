/* eslint-disable no-undef */
const mysql = require('mysql2');
require('dotenv').config(); // to load .env file

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
    } else {
        console.log('MySQL connected');
    }
});

module.exports = db;