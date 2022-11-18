const mysql = require('promise-mysql');

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password:  process.env.PASS,
    database: process.env.DATABASE
});
const getConnection = () =>{return connection}
module.exports = getConnection;

