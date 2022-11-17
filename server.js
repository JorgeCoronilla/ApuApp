//imports
require('dotenv').config();
const express = require('express');
const ejemploRouter = require("./routes/routes");

//const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;


//MongoDB connection
require("./ddbb/mongo");

//MYSQL conection
require("./ddbb/mysql");

//middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.text());

//Rutas
app.use("/", ejemploRouter);

//Set XXXXX folder as static
//app.use(express.static('XXXXXX'));

//set temaplate engine
app.set('view engine', 'ejs');

//Start listening
app.listen(PORT, () => {
    console.log(`Server started at http://127.0.0.1:${PORT}`);
});