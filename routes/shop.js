const router = require('express').Router();
const shopController = require('./../controllers/shop.controller')

router.get("/", shopController.getProducts)

module.exports = router