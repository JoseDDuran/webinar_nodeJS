const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password : '',
    database : 'webinar'
});

module.exports = connection;