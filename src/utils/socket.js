import socketClient from 'socket.io-client';

const socket = socketClient();
var peerConnection;
var App = null;

socket.on('update-user-list', function(users) {
    if (App) App.handleUpdateUsers(users);
});

socket.on('recieve-offer', function({sdp, socketId, targetSocketId}) {
    // socketId is the user sending us the offer
    peerConnection.setRemoteDescription(sdp)
    .then(() => peerConnection.createAnswer())
    .then(answer => {
        peerConnection.setLocalDescription(answer)
    })
    .then(function() {
        socket.emit('recieve-answer', {sdp: peerConnection.localDescription, targetSocketId: socketId});
    });    
});

socket.on('recieve-answer', function(payload) {
    peerConnection.setRemoteDescription(payload.sdp);
});

export const setApp = function(app) {
    App = app;
};

export const setPeerConnection = function(con) {
    peerConnection = con;
    peerConnection.onaddstream = function(e) {
        App.handleUpdateStream(e.stream);
    };
};

export const getSocket = function() {
    return socket;
};
