const loginRouter = require('express').Router();
const loginController = require("../controllers/login.controller");

loginRouter.get('/', loginController.start); // Renderiza la vista de la página al llegar a login
loginRouter.get('/recuperar', loginController.forgot); // Renderiza la vista de la página al darle a recuperar contraseña
loginRouter.post('/', loginController.getUser); // Recoge la info que proporciona el usuario, crea el token de acceso y le envía a su panel
loginRouter.post('/recuperar', loginController.sendEmail); // Recoge la info que proporciona el usuario para poder enviar el acceso a cambio de contraseña
loginRouter.get('/confirmacion/:token', loginController.confirmation); // Renderiza la vista de la página al llegar el usuario desde el link que se le ha enviado
loginRouter.post('/confirmacion/:token', loginController.updatePassword); // Si el usuario introduce el password correctamente, actualiza el password.

module.exports = loginRouter;