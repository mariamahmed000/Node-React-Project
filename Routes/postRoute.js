const express =require("express")

const router =express.Router();

const postController = require("../Controllers/postController");
const auth = require('../MiddelWare/auth')


router.route('/post')
.get(auth,postController.getPosts)
.post(auth,postController.addPost);

router.route('/post/:id')
.get(auth,postController.getPostsById)
.put(auth,postController.updatePost)
.delete(auth,postController.deletePost);

module.exports=router
