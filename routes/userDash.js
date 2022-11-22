const router = require('express').Router();
const userDashController = require('./../controllers/userDash.controller')

//Load User Dash
router.get("/:id_user", userDashController.getUser)
//Update User Data
router.post("/:id_user/update", userDashController.updateUser)
//Update User Pass
router.post("/:id_user/updatePass", userDashController.updatePass)


// Unsubscribe
router.get("/:id_user/unsubscribe", userDashController.unsubscribeForm)

router.post("/:id_user/deleteUser", userDashController.deleteUser)

module.exports = router