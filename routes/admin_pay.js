const router = require('express').Router();
const adminPay = require('./../controllers/admin_pay.controller')

router.get("/", adminPay.adminPayPage)

module.exports = router