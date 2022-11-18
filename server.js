//imports
require('dotenv').config();
const express = require('express');
const register = require ("./routes/register")
const adminRouter = require("./routes/admin");
const userDash = require ('./routes/userDash')
const loginRouter = require("./routes/login");

//MongoDB connection
require("./ddbb/mongo");
//MYSQL conection
require("./ddbb/mysql");

//const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static("."));
app.use(express.text());

//Rutas
app.use("/admin", adminRouter);
app.use("/login", loginRouter);
app.use("/userDash", userDash)
app.use("/register", routes);

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