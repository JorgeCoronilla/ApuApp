const loginRouter = require('express').Router();
const loginController = require("../controllers/login.controller");

loginRouter.get('/', loginController.start);
loginRouter.get('/recuperar', loginController.forgot);
loginRouter.post('/', loginController.getUser);
loginRouter.post('/recuperar', loginController.sendEmail);
loginRouter.get('/confirmacion/:token', loginController.confirmation);
loginRouter.post('/confirmacion/:token', loginController.updatePassword);
// loginRouter.get('/confirmacion/', loginController.verifyToken);

module.exports = loginRouter;