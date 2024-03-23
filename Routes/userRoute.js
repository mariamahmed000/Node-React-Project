const express =require("express");

const router= express.Router();

const userController = require("../Controllers/userController");
const auth = require('../MiddelWare/auth');

router.route("/register").post(userController.Register);
router.route("/login").post(userController.Login);

router.route("/user").get(auth,userController.getUers);
router.route("/user/:id")
.get(auth,userController.getUserById)
.put(auth,userController.updateUser)
.delete(auth,userController.deleteUser);

router.route("/user/:id/friends").get(auth,userController.getUserFriends);
router.route("/user/:id/:friendId").put(auth,userController.toggleAddRemoveFriend);

module.exports=router