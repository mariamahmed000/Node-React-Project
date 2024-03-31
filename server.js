const express = require('express');
require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 7005;
const CONNECTION =process.env.CONNECTION
var cors = require('cors');
const multer = require("multer");
const path = require("path");
const mongoose = require('mongoose');
const userRouter =require('./Routes/userRoute')
const postRouter =require('./Routes/postRoute')
const postController =require('./Controllers/postController')
const auth = require('./MiddelWare/auth')
const chatRouter =require('./Routes/chatRoute')
const messageRouter =require('./Routes/messageRoute')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname);

  },
});
const upload = multer({ storage });

app.post("/post", auth, upload.single("image"), postController.addPost);


mongoose
	.connect("mongodb+srv://mariammemo445:g2C2gSfLgebDgWF1@cluster0.hyc4hf1.mongodb.net/worldwide?retryWrites=true&w=majority")
	.then(data => {
		app.listen(PORT, () => {
			console.log('http://localhost:' + PORT);
		});
	})
	.catch(err => {
		console.log(err);
	});

console.log('http://localhost:' + PORT);

app.use(userRouter)
app.use(postRouter)
app.use(chatRouter)
app.use(messageRouter)

app.use((req, res) => {
  res.status(404).json({ message: "not found" });
});

app.use((error, req, res, next) => {
  let stat = error.status || 500;
  res.status(stat).send(error + " ");
});