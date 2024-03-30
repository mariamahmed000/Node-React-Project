const userModel = require("../Model/user");
const postModel = require("../Model/post");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.getUers = (req, res, next) => {
  userModel
    .find({})
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "Not Have User" });
      } else {
        res.status(200).json({ message: "sucess", data });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUserById = (req, res, next) => {
  const id = req.params.id;
  userModel
    .findById({ _id: id })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "Not Have User" });
      } else {
        res.status(200).json({ message: "sucess", data });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.Register = async (req, res, next) => {
  try {
    console.log("isgoogle", req.body.isGoogle);
    const isGoogle = req.body.isGoogle;
    const existingUser = await userModel.findOne({ email: req.body.email });

    ///google
    if (isGoogle && existingUser) {
      token = jwt.sign(
        {
          email: req.body.email,
          role: "user",
        },
        "cmsam",
        { expiresIn: "2hr" }
      );

      return res
        .status(200)
        .json({ message: "success", data: existingUser, token });
    }

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    let user = userModel({
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      email:req.body.email,
      password:req.body.password,
      userImage:req.body.userImage||"defultProfile.png",
      friends:[],
      location:req.body.location,
      viewedProfile:0,
      impressions:0
    });
    user
      .save()
      .then((data) => {
        if (!data) next(new Error("email & password incorrect"));

        ///////make token
        let token = "";

        token = jwt.sign(
          {
            email: req.body.email,
            role: "user",
          },
          "cmsam",
          { expiresIn: "2hr" }
        );

        res.status(200).json({ message: "success", data: data, token });
        ///////check for email
      })
      .catch((e) => {
        console.log(e);
        let message = e.message;
        console.log(message);
        message.includes("duplicate key error")
          ? (message = "already used mail")
          : (message = "please provide a valid data");
        res.status(400).json({ message });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.Login = (req, res, next) => {
  //////find to user
  userModel.findOne({ email: req.body.email }).then(async (data) => {
    if (!data) {
      res.status(500).json({ message: "Email or Password not correct" });
    } else {
      ///////bcrypt password compare
      var passwordValid = await bcrypt.compare(req.body.password,data.password);
      if(!passwordValid) return res.status(404).send("Invalid Email Or Password");
      
      ////////assign token
      let token;
      console.log(data);
      if (data.email == "admin@gmail.com") {
        token = jwt.sign(
          {
            email: data.email,
            role: "admin",
          },
          "cmsam",
          { expiresIn: "2hr" }
        );
        console.log(token);
        // res.status(200).json({data,token})
      } else {
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
      res.status(200).json({ message: "success", data, token });
    }
  });
};

exports.deleteUser = (req, res, next) => {
  try {
    const id = req.params.id;
    userModel.findByIdAndDelete({ _id: id }).then((data) => {
      if (!data) {
        res.status(404).json({ message: "Not have this User with This ID" });
      } else {
        res.status(200).json({ message: "success", data });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  userModel
    .findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          userImage: data.userImage,
          location: data.location,
          viewedProfile: data.viewedProfile,
        },
      }
    )
    .then((data) => {
      res.status(200).json({ message: "success", data });
    })
    .catch((error) => {
      res.json({ message: "enter valid user id" });
    });
};

exports.getUserFriends = async (req, res, next) => {
  try {
    const id = req.params.id;
    ////find the user
    const user = await userModel.findById({ _id: id });

    ///get array of friends
    const friends = await Promise.all(
      user.friends.map((id) => userModel.findById({ _id: id }))
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, location, userImage }) => {
        return { _id, firstName, lastName, location, userImage };
      }
    );

    res.status(200).json({ message: "success", data: formattedFriends });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.toggleAddRemoveFriend = async (req, res, next) => {
  try {
    const { id, friendId } = req.params;

    //get user and friend data
    const user = await userModel.findById(id);
    const friend = await userModel.findById(friendId);

    ///toggle friend
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    ///get array of friends
    const friends = await Promise.all(
      friend.friends.map((id) => userModel.findById({ _id: id }))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, userImage }) => {
        return { _id, firstName, lastName, occupation, location, userImage };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ message: err.message });
  }
};
