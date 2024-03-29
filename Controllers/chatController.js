const chatModel =require('../Model/chat')

exports.createChat=async(req,res)=>{
  const newChat = new chatModel({
    members:[req.body.senderId,req.body.receiverId],
  });
  try{
    const result =await newChat.save();
    res.status(200).json(result)

  }catch(err){
    res.status(500).json(err)
  }
}

exports.userChat=async(req,res)=>{
  try{
    const chat =await chatModel.find({
      members:{$in:[req.params.userId]}
    })
    console.log("chat",chat);
    res.status(200).json(chat)

  }catch(err){
    res.status(500).json(err)
  }
}


exports.findChat=async(req,res)=>{
  try{

    console.log("okkkkkkk");
    const chat =await chatModel.findOne({
      members:{$all:[req.params.firstId,req.params.secondId]}
    })
    console.log(chat);
    res.status(200).json(chat)

  }catch(err){
    res.status(500).json(err)
  }
}