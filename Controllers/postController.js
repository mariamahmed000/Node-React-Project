
const postModel =require('../Model/post')
const userModel = require('../Model/user')

exports.getPosts=async(req,res)=>{
  try{
    const posts = await postModel.find()
    res.status(200).json({posts});

  }catch(error){
    console.log("Error: " + error);
    res.status(500).json({message:'Error: ' + error});
  }
}
exports.getPostsById = async(req,res)=>{
  try{
    console.log(req.params)
    const userId = req.params.id;
    const user = await userModel.findById(userId);
    if(!user){
      return res.status(404).json({message:"User not found"});
    }
    const posts = await postModel.find({userId : userId})
    res.status(200).json({posts});

  }catch(error){
    console.log("Error: " + error);
    res.status(500).json({message:'Error: ' + error});
  }
}

exports.addPost=async(req,res,next)=>{
  try{
    const data=req.body;
    // add new post //
    const newPost = new postModel({
      userId:data.userId,
      description:data.description,
      postImage: data.postImage,
      likes: {},
      comments: {},
    });
    console.log(newPost);
    await newPost.save();

    // get all posts //
    postModel.find({}).populate("userId").then((data)=>{
        console.log(data);
        res.status(201).json({message:"success",data:data});
    }).catch((error)=>{
      next(error);
    })
  }catch (err) {
    res.status(409).json({ message: err.message });
  }
}

exports.updatePost= async(req,res)=>{
  try{
    
    const postId = req.params.id;
    const updatedata = req.body;
    const updatedPost = await postModel.findByIdAndUpdate(postId, updatedata,
      {
      new:true
      }
    );

    if(!updatedPost){
      return res.status(404).json({message:"not found post id"})
    }
    res.status(200).json({message:"success",data:updatedPost});
  }
  catch (err) {
    console.log("Error: " + err.message)
    res.status(500).json({message: err.message});
  }
}
exports.deletePost=async(req,res)=>{
  try{
    const postId = req.params.id;
    const updatedPost = await postModel.findByIdAndDelete(postId);

    if(!updatedPost){
      return res.status(404).json({message:"not found post id"})
    }
    res.status(200).json({message:"success",data:updatedPost});
  }
  catch (err) {
    console.log("Error: " + err.message)
    res.status(500).json({message: err.message});
  }
}