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

  // Réaction a la reception de message
  socket.on('message', (msg) => {
    console.log('New Message: ', msg);
    io.emit('message', msg);
  });

  // Mecanisme des groupes
  socket.on('groupJoin', (group) => {
    console.log('Join Group: ', group);
    io.to(group).emit('message', `[${group}] Un nouveau est là :o`);
    socket.join(group);
  });
  socket.on('groupLeave', (group) => {
    console.log('Leave Group: ', group);
    socket.leave(group);
    io.to(group).emit('message', `[${group}] On a un fuyard`);
  });
  socket.on('groupMessage', (group, msg) => {
    console.log('New Group Message: ', group, msg);
    io.to(group).emit('message', `[${group}] ${msg}`);
  });
});

// Start App
server.listen(4224, () => {
  console.log('listening on port 4224');
});