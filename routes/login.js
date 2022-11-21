const loginRouter = require('express').Router();
const loginController = require("../controllers/login.controller");

loginRouter.get('/', loginController.start);
loginRouter.post('/', loginController.getUser);

module.exports = loginRouter;