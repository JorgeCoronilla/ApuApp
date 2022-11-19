const register = require("express").Router()
const Register = require("../controllers/register.controller")


register.get('/register', (req, res) => {
    res.send("funciona!");
});


register.post("/register", Register.insertUser)




register.get('/findall',Register.findAll)



module.exports = register;