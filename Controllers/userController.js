const userModel =require("../Model/user")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.getUers=(req,res,next)=>{
  console.log("getUers");
  res.json("getUers")
}
exports.getUserById=(req,res,next)=>{
  res.json("getUserById")
  
}
exports.Register=async(req,res,next)=>{
  try{
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    let user = userModel({
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      email:req.body.email,
      password:req.body.password,
      userImage:req.body.userImage,
      friends:[],
      location:req.body.location,
      viewedProfile:0,
      impressions:0
    });
    user.save().then((data)=>{
      if(!data)next(new Error ("email & password incorrect"));

      ///////make token
      let token ='';

      token=jwt.sign(
        {
          email:req.body.email,
          role:"user",
        },
        "cmsam",
        {expiresIn:"2hr"}
      );

      res.status(200).json({message:"success",data:data,token})
      ///////check for email
    }).catch((e) => {
      console.log(e);
      let message = e.message;
      console.log(message);
      message.includes("duplicate key error")
        ? (message = "already used mail")
        : (message = "please provide a valid data");
      res.status(400).json({ message });
    });
  }
  catch(err){
    console.log(err);
    res.status(500).json({message});
  }

}


exports.Login=(req,res,next)=>{
  
  //////find to user
  userModel.findOne({email:req.body.email}).then(async(data)=>{
    if(!data) {
      res.status(500).json({message:"Email or Password not correct"});
    }else{

      ///////bcrypt password compare
      // var passwordValid = await bcrypt.compare(req.body.password,data.password);
      // if(!passwordValid) return res.status(404).send("Invalid Email Or Password");
      
      ////////assign token
      let token;
      console.log(data);
      if(data.email == "admin@gmail.com"){
          token=jwt.sign({
            email:data.email,
            role:"admin"
          },
          "cmsam",
          {expiresIn:"2hr"}
          );
          console.log(token);
          // res.status(200).json({data,token})
      }else {
        token = jwt.sign(
          {
            email: data.email,
            role: "user",
          },
          "cmsam",
          { expiresIn: "2hr" }
        );
        console.log(token);
      }

      res.status(200).json({ data,token});
    }
  })
    

}
exports.deleteUser=(req,res,next)=>{
  res.json("deleteUser")

}
exports.updateUser=(req,res,next)=>{
  res.json("updateUser")

}