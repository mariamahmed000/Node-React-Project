const express = require('express');
const app = express();
const PORT = process.env.PORT || 7005;
var cors = require('cors');
const multer = require("multer");
const path = require("path");
const mongoose = require('mongoose');
const userRouter =require('./Routes/userRoute')
const postRouter =require('./Routes/postRoute')


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

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

console.log('http://localhost:' + PORT);

app.use(userRouter)
app.use(postRouter)

app.use((req, res) => {
  res.status(404).json({ message: "not found" });
});

app.use((error, req, res, next) => {
  let stat = error.status || 500;
  res.status(stat).send(error + " ");
});