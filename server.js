const express = require('express')
const { Server } = require('socket.io')
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => { console.log('socket connected', socket.id) });

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
