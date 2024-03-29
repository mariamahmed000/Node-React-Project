const messageModel =require('../Model/message')


exports.addMessage=async(req,res)=>{
  const {chatId,senderId,text}=req.body;
  const message = new messageModel({
    chatId,
    senderId,
    text
  });
  try{
     const result =await message.save();
     res.status(200).json(result)
  }catch(err){
    res.status(500).json(err)
  }
  
}


exports.getMessages=async(req,res)=>{
  const {chatId}=req.params;

  try{
    const result =await messageModel.find({chatId});
    res.status(200).json(result)

  }catch(err){
    res.status(500).json(err)
  }
}