const express = require('express');
const socket = require('socket.io')

const app = express()

app.use(express.static('public'))

const server = app.listen(5000, () => {
    console.log("App listened to the port :- http://localhost:5000/")
});

const io = socket(server);

io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);
    
    socket.on('chat', (data) => {
        console.log('message: ' + data.message + '\thandle: ' + data.handle);
        io.sockets.emit('chat', data);
    });
    
    
    socket.on('typing', (handle) => {
        socket.broadcast.emit('typing', handle);
    })
    
    socket.on('disconnect', () => {
        console.log('user disconnected: ', socket.id);
    });
    
});