//imports
require('dotenv').config();
const morgan = require ('morgan')
const express = require('express');

const register = require ("./routes/register.js")
const adminRouter = require("./routes/admin");
const userDash = require ('./routes/userDash')
const loginRouter = require("./routes/login");
const shopRouter = require("./routes/shop");
const cartRouter = require("./routes/cart");

//const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;

//MongoDB connection
require("./ddbb/mongo");

//MYSQL conection
require("./ddbb/mysql");


//middlewares

app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Static
app.use('/', express.static("public"));
app.use('/userDash', express.static(__dirname + '/public'));
app.use(express.text());

//Rutas
app.use("/admin", adminRouter);
app.use("/login", loginRouter);
app.use("/userDash", userDash);
app.use("/register", register);
app.use("/shop", shopRouter);
app.use("/cart", cartRouter);

//Set XXXXX folder as static
//app.use(express.static('XXXXXX'));


//set temaplate engine
app.set('view engine', 'ejs');

// index page
app.get('/', function(req, res) {
    res.render('../views/index');
});

//Start listening
app.listen(PORT, () => {
    console.log(`Server started at http://127.0.0.1:${PORT}`);
});

