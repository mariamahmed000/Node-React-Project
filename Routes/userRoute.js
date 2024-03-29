const express =require("express");

const router= express.Router();

const userController = require("../Controllers/userController");
const auth = require('../MiddelWare/auth');

router.route("/register").post(userController.Register);
router.route("/login").post(userController.Login);

router.route("/user").get(userController.getUers);
router.route("/user/:id")
.get(userController.getUserById)
.put(auth,userController.updateUser)
.delete(auth,userController.deleteUser);

router.route("/user/:id/friends").get(auth,userController.getUserFriends);
router.route("/user/:id/:friendId").put(auth,userController.toggleAddRemoveFriend);

// router.route("/userimp").put(auth,userController.updateImpression)

module.exports=router