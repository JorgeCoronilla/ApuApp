//imports
require('dotenv').config();
const express = require('express');
const ejemploRouter = require("./routes/routes");

//const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static("."));
app.use(express.text());

//Rutas
app.use("/", ejemploRouter);


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