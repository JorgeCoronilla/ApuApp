const adminRouter = require('express').Router();
const controller = require("../controllers/admin.controller");

adminRouter.get('/:admin_id', controller.dashAdmin);
adminRouter.get('/:admin_id/update', controller.showAdmin);
adminRouter.post('/:admin_id/update', controller.updateAdmin);
adminRouter.get('/:admin_id/create_admin', controller.createAdmin)
adminRouter.post('/:admin_id/create_admin', controller.insertAdmin);
adminRouter.get('/:admin_id/users', controller.allUsers);
adminRouter.get('/:admin_id/check/:user', controller.checkUser);
adminRouter.get('/:admin_id/users/:user', controller.editUser);
adminRouter.get('/:admin_id/users/:user/delete', controller.deleteUser);
adminRouter.delete('/:admin_id/users/:user/delete', controller.confirmDeleteUser);
adminRouter.post('/:admin_id/users/:user', controller.updateUser);
adminRouter.get('/:admin_id/bills/', controller.allBills);
adminRouter.get('/:admin_id/print/:id_bill', controller.printBill);
adminRouter.get('/:admin_id/labs/:labname/delete', controller.deleteLab);
//adminRouter.post('/:admin_id/labs/:labname/update', controller.insertLabs);
adminRouter.get('/:admin_id/labs/:labname', controller.findLab);
adminRouter.post('/:admin_id/labs/:labname/update', controller.updateLabs);
adminRouter.get('/:admin_id/labs/', controller.checkLabs);
//adminRouter.delete('/:admin_id/stores/update', controller.deleteStores);
//adminRouter.post('/:admin_id/stores/update', controller.insertStores);
//adminRouter.post('/:admin_id/stores/update', controller.updateStores);
adminRouter.get('/:admin_id/stores/', controller.checkStores);
//adminRouter.delete('/:admin_id/deliveryPoints/update', controller.deleteDeliveryPoints);
//adminRouter.post('/:admin_id/deliveryPoints/update', controller.insertDeliveryPoints);
//adminRouter.post('/:admin_id/deliveryPoints/update', controller.updateDeliveryPoints);
adminRouter.get('/:admin_id/deliveryPoints/', controller.checkdeliveryPoints);

module.exports = adminRouter;
