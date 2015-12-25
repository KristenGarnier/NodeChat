'use strict';
module.exports = (io) => {
    let chatrooms = io.of('/roomlist').on('connection', () => {
        console.log('connection established');
    });
};
