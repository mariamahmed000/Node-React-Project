const postModel =require('../Model/post')

exports.putLikesofPostById =async (req ,res)=>{
    try{
        const postId = req.params.id;
        const post = await postModel.findById(postId);
        const {userId} = req.body;
        const like = post.likes.get(userId);
        if(like){
            post.likes.delete(userId);
        }
        else
        {
            post.likes.set(userId,true);
        }
        const updatedPost = await postModel.findByIdAndUpdate(postId, {likes:post.likes},
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



