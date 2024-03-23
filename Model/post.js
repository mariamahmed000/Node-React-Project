const mongoose = require("mongoose");

const postShema = new mongoose.Schema({

  userId:{
    type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
  },
  postImage:{
    type:String
  },
  likes: {
    type: Map,
    of: Boolean,
  },
  comments: {
    type: Map,
    of: String,
  },
  description:{
    type:String
  }

})

module.exports=mongoose.model("Posts",postShema)