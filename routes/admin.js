/*
 name
 surname1
 surname2
 email
 pass

 editar datos + email

 crear admin
 editar admin
 descargar la factura de cualquier usuario
 Añadir puntos de recogida, laboratorios de reparación, tiendas (deben cargarse en el
 mapa.
*/

const adminRouter = require('express').Router();
const controller = require("../controllers/admin.controller");
const mongoose = require("mongoose");
const modelo = require("../models/ejemplo.model");

adminRouter.get('/:user', controller.datosAdmin)
//adminRouter.post('/:user', controller.updateAdmin)
adminRouter.post('/:user', (req, res) => {
    //const {name_New, surname1_New, surname2_New, email_New} = req.body;   ----¿????????????
    const name_New = req.body.name_New, surname1_New = req.body.surname1_New, surname2_New = req.body.surname2_New, email_New = req.body.email_New
    console.log(name_New, surname1_New, surname2_New, email_New);
    
    const {user} = req.params;
    console.log(user)
    //console.log(req.params)

   
let insert ="UPDATE app_admins SET ";
    if (name_New && surname1_New && surname2_New && email_New) { 
    console.log(name_New, surname1_New, surname2_New, email_New);
        let insert = `UPDATE app_admins SET admin_name = "${name_New}", surname_1 = "${surname1_New}", surname_2 = "${surname2_New}", email = "${email_New}"  WHERE id_admin = ${user};`}
        const connection = require('../ddbb/mysql')
        console.log(insert)
    connection.query(insert, (err, res) => {
      
    });
    res.send();
});
adminRouter.get('/:user', controller.datosAdmin)
module.exports = adminRouter;