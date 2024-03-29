const postModel =require('../Model/post')
const userModel = require("../Model/user")

exports.putLikesofPostById =async (req ,res)=>{
    try{
        const postId = req.params.id;
        const post = await postModel.findById(postId);
        const userEmail =req.email;
        const userId = await userModel.find({email:userEmail});
        console.log(userId[0]._id.toString());
        // const {Id} = req.body;
        // console.log(Id);
        const like = post.likes.get(userId[0]._id.toString());
        console.log("like",like);
        if(like){
            post.likes.delete(userId[0]._id.toString());
        }
        else
        {
          // console.log("userId[0]._id.toString()",userId[0]._id.toString());
            post.likes.set(userId[0]._id.toString(),true);
        }
        const updatedPost = await postModel.findByIdAndUpdate(postId, {likes:post.likes},
            {
            new:true
            }
        ).populate('userId');
        updateImpression(post)
        res.status(200).json({updatedPost});
    }catch(e){
        console.log("Error: " + e.message)
    res.status(500).json({message: e.message});
    }
}



const updateImpression =async(post)=>{

  const userLogin = await userModel.findById({_id:post.userId});
  console.log("userLogin",userLogin);
  const posts = await postModel.find({userId:userLogin._id});
  console.log("posts",posts);
  const totalImp=posts.reduce((total,current)=>total+(current.likes.size),0)
  console.log("totalImp",totalImp);
  const update =await userModel.updateOne({_id:userLogin._id},{$set:{impressions:totalImp}});
  // res.json(update)
}

