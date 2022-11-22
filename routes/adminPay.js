const router = require('express').Router();
const adminPay = require('./../controllers/admin.payment.controller')

router.get("/", adminPay.sendToPayment)

module.exports = router