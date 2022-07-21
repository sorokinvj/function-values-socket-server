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

let x = 0;
const getNewCoordinates = (x) => {
  const y = Math.floor(Math.sin(x) * 100) / 100;
  return { x, y };
};
setInterval(() => {
  console.log("emitting coordinates", getNewCoordinates(x));
  io.emit("new coordinates", getNewCoordinates(x));
  x++;
}, 1000);
