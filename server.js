//imports
require('dotenv').config();
const morgan = require ('morgan')
const express = require('express');
const ejemploRouter = require("./routes/routes");

//MongoDB connection
require("./ddbb/mongo");
//MYSQL conection
require("./ddbb/mysql");

//const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;

//middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static("."));

app.use('/userDash', express.static(__dirname + '/public'));
app.use(express.text());

//Rutas
// const loginRouter = require('./routes/login');
// app.use('/login', loginRouter);

// const register = require ("./routes/register.js")
// app.use('/register', routes)

// const adminRouter = require("./routes/admin");
// app.use("/admin", adminRouter);

const userDash = require ('./routes/userDash')
app.use("/userDash", userDash)


//Set XXXXX folder as static
//app.use(express.static('XXXXXX'));

//set temaplate engine
app.set('view engine', 'ejs');

// index page
app.get('/', function(req, res) {
    res.render('../views/index');
});

// index userDash
app.get('/userDash', function(req, res) {
    res.render('../views/userDash');
});


//Start listening
app.listen(PORT, () => {
    console.log(`Server started at http://127.0.0.1:${PORT}`);
});