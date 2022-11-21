const router = require('express').Router();
const cartController = require('./../controllers/cart.controller')

router.get("/:items_ids", cartController.getCart)

module.exports = router