const postModel =require('../Model/post')
const userModel = require('../Model/user')
exports.putCommentsOfPostById =async (req ,res)=>{
    try{
        const postId = req.params.id;
        const post = await postModel.findById(postId);
        const {userId,userComment} = req.body;
        post.comments.push({userId,comment:userComment});
        const updatedPost = await postModel.findByIdAndUpdate(postId, {comments:post.comments},
            {
            new:true
            }
          );
        res.status(200).json({updatedPost});
    }catch(e){
        console.log("Error: " + e.message)
    res.status(500).json({message: e.message});
    }
}

// exports.getComments=async(req,res)=>{
//     try{
//     const postId = req.params.id;
//     const post = await postModel.findById(postId);
//     const comments = post.comments;
//     console.log(comments);
//     const userComments = await Promise.all(
//         comments.map((comment) =>{ 
//         console.log("USERID COMMENT",comment.userId);
//         userModel.findById(comment.userId)
//         }))
//         console.log({userComments})
//         res.status(200).json({userComments});
//     }
//     catch(error){
//         console.log("Error: " + error);
//         res.status(500).json({message:'Error: ' + error});
//     }
// }


exports.getComments = async (req, res) => {
    try {
    const postId = req.params.id;
    const post = await postModel.findById(postId);
    const comments = post.comments;

    const userComments = await Promise.all(comments.map(async (comment) => {

    const user = await userModel.findById(comment.userId);

    return user ? { userId: user._id, firstName: user.firstName, comment: comment.comment } : null;
    }));

    res.status(200).json({ userComments });
} catch (error) {
    console.log("Error: " + error);
    res.status(500).json({ message: 'Error: ' + error });
}
}
