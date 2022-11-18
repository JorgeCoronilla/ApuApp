const { connect } = require('mongoose');
const mysql = require('promise-mysql');

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password:  "rootroot",
//     database: process.env.DATABASE
// });
const getConnection = () => {return connection}
// connection.connect((err)=> {
//     if(!err){
//         console.log('Connection Established Successfully');
//         //connection.end();
//     }else{
//         console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
//     }
// });
module.exports = getConnection;