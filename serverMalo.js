
//imports
require('dotenv').config();
const express = require('express');
const router = require("./routes/routes");

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
app.get('/session/:user', (req, res) => {
    const {user} =req.params.user;
    if(!user) return res.statusMessage(400).send();
    return res.send();
});

app.get('/session/:user', (req, res) => {
    const { user } = req.params.user;
    if (!user) return res.statusMessage(400).send();
    return res.send();
});

app.get('/login',  (req, res) => {
    res.render("../views/login.ejs");
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || password) return res.statusMessage(400).send();
    return res.send();
});

app.patch('/session/:user', (req, res) => {
    const { user } = req.params.user;
    res.send();
});

app.delete('/session/:user', (req, res) => {
    const {user} =req.params.user;
    res.send();
});


//set temaplate engine
app.set('view engine', 'ejs');

//Start listening
app.listen(PORT, () => {
    console.log(`Server started at http://127.0.0.1:${PORT}`);
});

