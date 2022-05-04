const express = require('express');
const cors = require('cors');
const http = require('http');

// Server Express
const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    message: 'Demo de l\'utilisation de Socket IO'
  });
});
const server = http.createServer(app);

// Server WebSocket
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('message', (msg) => {
    console.log('New Message: ', msg);
    io.emit('message', msg);
  });
});

// Start App
server.listen(4224, () => {
  console.log('listening on port 4224');
});