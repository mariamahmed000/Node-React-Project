const postModel =require('../Model/post')
const userModel = require('../Model/user')

exports.getPosts=(req,res,next)=>{
  
}
exports.getPostsById=async(req,res,next)=>{

}


exports.addPost=async(req,res,next)=>{
  try{
    const data=req.body;

    ////add new post //////
    const newPost = new postModel({
      userId:data.userId,
      description:data.description,
      postImage: data.postImage,
      likes: {},
      comments: {},
    });
    console.log(newPost);
    await newPost.save();
    ////////////////////////////////
    ///////get all postes////////
    postModel.find({}).populate("userId").then((data)=>{
        console.log(data);
        
        res.status(201).json({message:"success",data:data});
    }).catch((error)=>{
      next(error);
    })
    ///////////////////////////////////
  }catch (err) {
    res.status(409).json({ message: err.message });
  }
}



exports.updatePost=(req,res,next)=>{

}
exports.deletePost=(req,res,next)=>{

}