const postModel = require("../Model/post");
const userModel = require("../Model/user");
exports.putCommentsOfPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await postModel.findById(postId);
    const { userId, userComment } = req.body;
    post.comments.push({ userId, comment: userComment });
    const updatedPost = await postModel.findByIdAndUpdate(
      postId,
      { comments: post.comments },
      {
        new: true,
      }
    );
    res.status(200).json({ updatedPost });
  } catch (e) {
    console.log("Error: " + e.message);
    res.status(500).json({ message: e.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await postModel.findById(postId);
    const comments = post.comments;

    const userComments = await Promise.all(
      comments.map(async (comment) => {
        const user = await userModel.findById(comment.userId);

        return user
          ? {
              userId: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              comment: comment.comment,
            }
          : null;
      })
    );

    res.status(200).json({ userComments });
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({ message: "Error: " + error });
  }
};

exports.deleteComments = async (req, res) => {
  try {
    const { id, commentId } = req.params;

    const post = await postModel.findById(id);
    const comments = post.comments;
    const userPost = post.userId;
    const userEmail = req.email;
    const userLogin = await userModel.find({ email: userEmail });

    comments.forEach(async (com) => {
      if (
        com.userId.toString() === userLogin[0]._id.toString() ||
        userLogin[0]._id.toString() === userPost.toString()
      ) {
        const commentIndex = comments.findIndex(
          (comment) => comment._id.toString() === commentId
        );
        if (commentIndex !== -1) {
          comments.splice(commentIndex, 1);
        }
      }
    });

    postModel
      .findByIdAndUpdate(id, {
        $set: {
          comments: comments,
        },
      })
      .then((data) => {
        res.status(200).json({ message: "success", data: data });
      })
      .catch((error) => {
        res.json({ message: error.message });
      });
  } catch (error) {
    res.json({ message: error.message });
  }
};
