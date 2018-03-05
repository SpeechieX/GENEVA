import socketClient from 'socket.io-client';

const socket = socketClient();
var peerConnection;
var App = null;

socket.on('update-user-list', function(users) {
    if (App) App.handleUpdateUsers(users);
});

socket.on('offer', function({sdp, offererSocketId, answererSocketId}) {
    console.info(`${Date.now()}: offer message received`)
    
    peerConnection.setRemoteDescription(sdp)
    .then(addAnswererStream)

    .then(() => peerConnection.createAnswer())
    .then(answer => {
        console.info(`just created answer and will now set local description with it`)
        return peerConnection.setLocalDescription(answer);
    })
    .then(function() {
        console.info(`${Date.now()}:local description set and now going to emit answer`)
        socket.emit('answer', {sdp: peerConnection.localDescription, offererSocketId});   
    })
    .catch(err => console.log(err)); 
});

socket.on('answer', function(payload) {
    peerConnection.setRemoteDescription(payload.sdp);
});

export const setApp = function(app) {
    App = app;
};

export const setPeerConnection = function(con) {
    peerConnection = con;
    peerConnection.ontrack = function(e) {
        App.handleUpdateStream('remoteStream, e.streams[0]');
    };
};

export const getSocket = function() {
    return socket;
};

function addAnswererStream() {
    return navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true
    })
    .then((stream) => {
        stream.getTracks().forEach((track) => {
            peerConnection.addTrack(track, stream);
        });
        App.handleUpdateStream('localStream', stream);

        console.dir(peerConnection)
    })
}
