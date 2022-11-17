const ejemploRouter = require('express').Router();
const controller = require("../controllers/ejemplo.controllers");

//rutas
ejemploRouter.get('/session/:user', controller.sessionUser);
ejemploRouter.get('/login', controller.ejemploRender);
ejemploRouter.post('/login', controller.ejemploPost);
ejemploRouter.patch('/session/:user', controller.ejemploPatch);
ejemploRouter.delete('/session/:user', controller.ejemploDelete);

module.exports = ejemploRouter;

/*
/
clicks

/login
{user,password}

/login/recover
{user,password}

/register
{name, surname,email,address,bankAcount,pass,pass2}


/session/:user/
/session/:user/dash
{name, surname,email,address,bankAcount,pass,pass2}

/session/:user/shop
click

/session/:user/cart
{products, quantity}

/session/:user/payment
{user, bankAcount, atc}

/session/:user/payment/success


/session/:admin/dash
{name, surname,email,address,bankAcount,pass,pass2}


/repairs/
/repairs/:tienda
{contact-details}

*/