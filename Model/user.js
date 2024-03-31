const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var validator = require('validator');


const userShema = new mongoose.Schema({
  
  firstName:{
    type:String,
    required:true,
    min:3,
    max:100
  },
  lastName:{
    type:String,
    required:true,
    min:3,
    max:100
  },
  email:{
    type: String,
		required: true,
    unique: true,
		validate: {
			validator: val => {
				return validator.isEmail(val);
			},
			message: '{email} Not Valid!!',
		},

  },
  location:String,
  password:{
    type:String,
    required:true,
    minlength:8
  },
  userImage:{
    type:String,
  },
  friends:{
    type:Array,
    default:[]
  },
  viewedProfile:{
    type:Number,
    default:0
  },
    impressions: {
      type:Number,
      default:0
    },
},{timestamps:true})


// userShema.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt();
//   // console.log(salt)
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });
// userShema.post("save", (document, next) => {
//   // console.log("created");
//   next();
// });
module.exports=mongoose.model("User",userShema)
