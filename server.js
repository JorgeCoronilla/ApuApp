//imports
require('dotenv').config();
const express = require('express');
const register = require ("./routes/register.js")
const adminRouter = require("./routes/admin");
const userDash = require ('./routes/userDash')
const loginRouter = require("./routes/login");
//const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;

//MongoDB connection
require("./ddbb/mongo");

//MYSQL conection
require("./ddbb/mysql");


//middlewares
app.use(express.json());
app.use(express.static("."));
//app.use(express.text());


//Rutas
app.use("/admin", adminRouter);
app.use("/login", loginRouter);
app.use("/userDash", userDash)
app.use("/register", register);

//set temaplate engine
app.set('view engine', 'ejs');



//Start listening
app.listen(PORT, () => {
    console.log(`Server started at http://127.0.0.1:${PORT}`);
});