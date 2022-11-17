const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password:  process.env.PASS,
    database: process.env.DATABASE
});

connection.connect((err)=> {
    if(!err){
        console.log('Connection Established Successfully');
        //connection.end();
    }else{
        console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
    }
});