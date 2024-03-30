const express =require("express")

const router =express.Router();

const postController = require("../Controllers/postController");
const likesController = require("../Controllers/likesController");
const commentsController = require("../Controllers/commentsController");

const auth = require('../MiddelWare/auth')


router.route('/post')
.get(auth,postController.getAllHomePosts)



router.route('/post/:id')
// .get(postController.getPostsById)
.put(postController.updatePost)
.delete(postController.deletePost);

router.route("/postUser").get(auth,postController.getPostsById);

router.route('/post/:id/like')
.put(auth,likesController.putLikesofPostById);

router.route('/post/:id/comment')
.put(auth,commentsController.putCommentsOfPostById)
.get(commentsController.getComments)

router.route('/post/:id/:commentId')
.delete(auth,commentsController.deleteComments);

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
