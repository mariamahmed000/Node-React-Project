
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

exports.getAllHomePosts=async(req,res)=>{
try{

  const userEmail =req.email;
  const user = await userModel.findOne({email:userEmail});
  let allPosts =[];
  const posts= await Promise.all(user.friends.map(async(id)=>{
    const data= await getPostsUser(id);
    console.log("data",data);
    if(data.length!=0){allPosts.push(...data);}
  }));
  const data= await getPostsUser(user._id);
  if(data.length!=0){allPosts.push(...data);}
  console.log("allposts",allPosts);
  res.status(200).json({message:"success",data:allPosts})
}catch(e){
  res.status(404).json({message:e.message})

}

}

const getPostsUser= async(id)=>{
  const posts = await postModel.find({userId : id}).populate('userId')
  return posts;
}

exports.getPostsById = async(req,res)=>{
  try{

    const userId = req.params.id;
    const posts = await postModel.find({userId })
    res.status(200).json({posts});

  }catch(error){
    console.log("Error: " + error);
    res.status(500).json({message:'Error: ' + error});
  }
}

exports.addPost=async(req,res,next)=>{
  try{
    const data=req.body;
    const userEmail =req.email;
    const user = await userModel.findOne({email:userEmail});
    // add new post //
    const newPost = new postModel({
      userId:user._id,
      description:data.description,
      postImage: data.postImage,
      likes: {},
      comments: [],
    });
    console.log(newPost);
    await newPost.save();

    // get all posts //
    let allPosts =[];
    const posts= await Promise.all(user.friends.map(async(id)=>{
      const data= await getPostsUser(id);
      console.log("data",data);
      if(data.length!=0){allPosts.push(...data);}
    }));
    const postData= await getPostsUser(user._id);
    if(postData.length!=0){allPosts.push(...postData);}
  console.log("allposts",allPosts);
  res.status(200).json({message:"success",data:allPosts})
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
