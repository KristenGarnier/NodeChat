'use strict';
module.exports = (io, rooms) => {
    let chatrooms = io.of('/roomlist').on('connection', (socket) => {
        console.log('connection established');
        socket.emit('roomupdate', JSON.stringify(rooms));

        socket.on('newroom', data => {
            rooms.push(data);
            socket.broadcast.emit('roomupdate', JSON.stringify(rooms));
            socket.emit('roomupdate', JSON.stringify(rooms));
        });

    });


};
