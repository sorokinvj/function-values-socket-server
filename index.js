const io = require("socket.io")();

io.listen(process.env.PORT || 2000, {
  cors: {
    origin: "*",
  },
});

const getNewCoordinates = (x) => {
  const y = Math.floor(Math.sin(x) * 100) / 100;
  return { x, y };
};

let x = 0;

io.on("connection", (socket) => {
  const { id } = socket;
  console.log(`connect: ${id}`);

  // start broadcasting functions value from 0
  // for each socket
  x = 0;

  socket.on("disconnect", () => {
    console.log(`disconnect: ${id}`);
  });
});

setInterval(() => {
  io.emit("new coordinates", getNewCoordinates(x));
  x++;
}, 1000);
