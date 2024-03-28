
const { Server } = require("socket.io");


const io = new Server({
  cors:{
    origin:"http://localhost:3000"
  }
});


io.on("connection", (socket) => {
  console.log("someone login ");

  socket.on("disconnect",()=>{
    console.log("someone left");
  })
});

io.listen(5000, (token) => {
  if (!token) {
    console.warn("port already in use");
  }
});