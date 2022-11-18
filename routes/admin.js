
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

adminRouter.get('/:admin_id', controller.dashAdmin)
adminRouter.post('/:admin_id', controller.updateAdmin);
adminRouter.get('/:admin_id/create_admin', controller.createAdmin)
adminRouter.post('/:admin_id/create_admin', controller.insertAdmin);
adminRouter.get('/:admin_id/users', controller.allUsers);
adminRouter.get('/:admin_id/check/:user', controller.checkUser);
adminRouter.get('/:admin_id/users/:user', controller.editUser);
adminRouter.get('/:admin_id/users/:user/delete', controller.deleteUser);
adminRouter.post('/:admin_id/users/:user/delete', controller.confirmDeleteUser);
adminRouter.post('/:admin_id/users/:user', controller.updateUser);
adminRouter.get('/:admin_id/print/:id_bill', controller.printBill);
module.exports = adminRouter;

