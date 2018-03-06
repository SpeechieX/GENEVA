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

    console.info(`${Date.now()}: received answer message; next line will setRemoteDescription`)

    peerConnection.setRemoteDescription(payload.sdp);
});

export const setApp = function(app) {
    App = app;
};

export const setPeerConnection = function(con) {
    peerConnection = con;
    peerConnection.ontrack = function(e) {

        console.info(`${Date.now()}: peerConnection.ontrack event recieved with this event: ${e}`)

        App.handleUpdateStream('remoteStream', e.streams[0]);
    };
};

export const getSocket = function() {
    return socket;
};


function addAnswererStream() {
    return navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
    })
    .then((stream) => {

    
        console.info(`${Date.now()}: adding tracks to peerConnection within 'offer' socket message before sending answer`)

        stream.getTracks().forEach((track) => {
            peerConnection.addTrack(track, stream);
        });

        App.handleUpdateStream('localStream', stream);

        console.info(`${Date.now()}: done adding tracks to this peerConnection`)
        console.dir(peerConnection)

    });
}