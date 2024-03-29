const express =require("express")

const router =express.Router();
const chatController =require("../Controllers/chatController")

router.post("/chat",chatController.createChat);
router.get('/chat/:userId',chatController.userChat);
router.get('/chat/find/:firstId/:secondId',chatController.findChat);

module.exports=router