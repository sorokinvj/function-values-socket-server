const io = require("socket.io")();

io.on("connection", (socket) => {
  console.log(`connect: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`disconnect: ${socket.id}`);
  });
});

io.listen(3000, {
  cors: {
    origin: ["http://localhost:3001"],
  },
});

setInterval(() => {
  console.log("emitting time", new Date().toISOString());
  io.emit("message", new Date().toISOString());
}, 1000);
