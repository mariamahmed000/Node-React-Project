const express =require("express")

const router =express.Router();
const messageController =require('../Controllers/messageController')


router.post("/message",messageController.addMessage);
router.get('/message/:chatId',messageController.getMessages);


module.exports=router