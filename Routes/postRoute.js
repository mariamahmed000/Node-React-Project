const express =require("express")

const router =express.Router();
const multer = require('multer');
const upload = multer();

const postController = require("../Controllers/postController");
const auth = require('../MiddelWare/auth')


router.route('/post').get(auth,postController.getPosts)

router.route('/post/:id')
.get(auth,postController.getPostsById)
.put(auth,postController.updatePost)
.delete(auth,postController.deletePost);

module.exports=router
