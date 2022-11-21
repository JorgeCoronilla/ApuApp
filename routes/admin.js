const adminRouter = require('express').Router();
const controller = require("../controllers/admin.controller");

adminRouter.get('/:admin_id', controller.dashAdmin);
adminRouter.get('/:admin_id/update', controller.showAdmin);
adminRouter.post('/:admin_id/update', controller.updateAdmin);

adminRouter.get('/:admin_id/create_admin', controller.createAdmin)
adminRouter.post('/:admin_id/create_admin', controller.insertAdmin);

adminRouter.get('/:admin_id/users', controller.allUsers);
adminRouter.post('/:admin_id/users', controller.insertUser);
adminRouter.get('/:admin_id/check/:user', controller.checkUser);
adminRouter.get('/:admin_id/users/:user', controller.editUser);
adminRouter.post('/:admin_id/users/:user', controller.updateUser);
adminRouter.get('/:admin_id/users/:user/delete', controller.deleteUser);
adminRouter.post('/:admin_id/users/:user/delete', controller.confirmDeleteUser);

adminRouter.get('/:admin_id/bills/', controller.allBills);
adminRouter.get('/:admin_id/print/:id_bill', controller.printBill);

adminRouter.get('/:admin_id/labs/:labname/delete', controller.deleteLab);
adminRouter.post('/:admin_id/labs/', controller.insertLabs);
adminRouter.get('/:admin_id/labs/:labname', controller.findLab);
adminRouter.post('/:admin_id/labs/:labname/update', controller.updateLabs);
adminRouter.get('/:admin_id/labs/', controller.checkLabs);

adminRouter.get('/:admin_id/stores/:storename/delete', controller.deleteStore);
adminRouter.post('/:admin_id/stores/', controller.insertStores);
adminRouter.get('/:admin_id/stores/:storename', controller.findStore);
adminRouter.post('/:admin_id/stores/:storename/update', controller.updateStores);
adminRouter.get('/:admin_id/stores/', controller.checkStores);

adminRouter.get('/:admin_id/deliveryPoints/:deliveryPoint/delete', controller.deleteDeliveryPoint);
adminRouter.post('/:admin_id/deliveryPoints', controller.insertDeliveryPoint);
adminRouter.get('/:admin_id/deliveryPoints/:deliveryPoint', controller.findDeliveryPoint);
adminRouter.post('/:admin_id/deliveryPoints/:deliveryPoint/update', controller.updateliveryPoints);
adminRouter.get('/:admin_id/deliveryPoints/', controller.checkdeliveryPoints);

adminRouter.get('/:admin_id/services/', controller.allservices);
adminRouter.get('/:admin_id/sales/', controller.allSales);

//adminRouter.get('/:admin_id/compras/', controller.shopAdmin);
//adminRouter.get('/:admin_id/shop/:user', controller.shopAdmin);
//adminRouter.get('/:admin_id/cart/:user', controller.cartAdmin);


module.exports = adminRouter;
