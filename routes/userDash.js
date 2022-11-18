const router = require('express').Router();
const userDashController = require('./../controllers/userDash.controller')

router.get("/all", userDashController.getUsers)
router.get("/:id_user", userDashController.getUser)
router.put("/:id_user", userDashController.updateUser)
router.delete("/:id_user", userDashController.deleteUser)

module.exports = router