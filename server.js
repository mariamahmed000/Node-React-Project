const express = require('express');
const app = express();
const PORT = process.env.PORT || 7005;
var cors = require('cors');
const multer = require("multer");
const path = require("path");
const mongoose = require('mongoose');
const userRouter =require('./Routes/userRoute')
const postRouter =require('./Routes/postRoute');
const auth = require('./MiddelWare/auth');
const postController = require("./Controllers/postController");


////////////image file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// router.route("/register").post(upload.single('image'),userController.Register);
app.post('/post',auth,upload.single('image'),postController.addPost);


////////CONFIGURATIONS
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


////////database connection
mongoose
	.connect(
		'mongodb+srv://mariammemo445:g2C2gSfLgebDgWF1@cluster0.hyc4hf1.mongodb.net/worldwide?retryWrites=true&w=majority',
	)
	.then(data => {
		app.listen(PORT, () => {
			console.log('http://localhost:' + PORT);
		});
	})
	.catch(err => {
		console.log(err);
	});


////////////Routes
app.use(userRouter)
app.use(postRouter)
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));


app.use((req, res) => {
  res.status(404).json({ message: "not found page" });
});

app.use((error, req, res, next) => {
  let stat = error.status || 500;
  res.status(stat).send(error + " ");
});