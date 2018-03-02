import socketClient from 'socket.io-client';

const socket = socketClient();
var App = null;

socket.on('update-user-list', function(users) {
    if (App) App.handleUpdateUsers(users);
});

socket.on('recieve-offer', function({sdp, socketId}) {
    // socketId is the user sending us the offer
    console.log(sdp);

    let newSdp = null;

    socket.broadcast.to(socketId).emit('recieve-answer', newSdp)
});

socket.on('recieve-answer', function(sdp) {
    console.log(sdp);
});

export default socket;

export const setApp = function(app) {
    App = app;
};