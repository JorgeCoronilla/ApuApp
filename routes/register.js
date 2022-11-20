const register = require("express").Router()
const Register = require("../controllers/register.controller")

register.get('/', Register.start);
register.post("/", Register.insertUser)
register.get("/confirmed", Register.index)

//register.get('/findall',Register.findAll)


module.exports = register
