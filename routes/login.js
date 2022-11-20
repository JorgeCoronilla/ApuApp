const loginRouter = require('express').Router();
const loginController = require("../controllers/login.controller");

loginRouter.get('/', loginController.start);
loginRouter.get('/recuperar', loginController.forgot);
loginRouter.post('/', loginController.getUser);
loginRouter.post('/recuperar', loginController.getUser);
loginRouter.get('/confirmacion/:token', loginController.verifyToken);
loginRouter.get('/confirmacion/', loginController.verifyToken);

module.exports = loginRouter;