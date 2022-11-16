//imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const mysql = require('mysql');

//const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;


//MongoDB connection

mongoose.connect(process.env.DB_URI_MONGO, {useNewUrlPArser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on('error', (error) => console.log("error"));
db.once('open', ()=> console.log("Connected to db"));

//MYSQL conection

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'baseprueba'
});

connection.connect((err)=> {
    if(!err){
        console.log('Connection Established Successfully');
        //connection.end();
    }else{
        console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
    }
});

//middlewares

app.use(express.urlencoded({extended: false}));
app.use(express.json());


//Set XXXXX folder as static
//app.use(express.static('XXXXXX'));


//set temaplate engine
app.set('view engine', 'ejs');



app.listen(PORT, () => {
    console.log(`Server started at http://127.0.0.1:${PORT}`);
});