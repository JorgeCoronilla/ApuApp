const router = require('express').Router();
const userPay = require('./../controllers/user_pay.controller')

router.get("/", userPay.userPayPage)

module.exports = router