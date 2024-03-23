const express =require("express")

const router =express.Router();

const postController = require("../Controllers/postController");
const likesController = require("../Controllers/likesController");
const commentsController = require("../Controllers/commentsController");

const auth = require('../MiddelWare/auth')


router.route('/post')
.get(postController.getPosts)
.post(postController.addPost);

router.route('/post/:id')
.get(postController.getPostsById)
.put(postController.updatePost)
.delete(postController.deletePost);

router.route('/post/:id/like')
.put(likesController.putLikesofPostById);

router.route('/post/:id/comment')
.put(commentsController.putCommentsOfPostById)
.get(commentsController.getComments);
// .delete(postController.deletePost);

module.exports=router



// {
//     "userId": "65fe9c5c65cf4b6427fb496a",
//     "postImage": "https://example.com/image.jpg",
//     "likes": {[
//         {"65fe9c5c65cf4b6427fb496a",true},
//     ]},
//     "comments": {},
//     "description": "post abdallah 2 "
// }
