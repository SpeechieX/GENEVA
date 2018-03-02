// import React, { Component } from 'react';
// import SimplePeer from 'simple-peer';




// class VideoRules extends Component {
//     constructor() {
//     super(); {
//         this.state = "";


navigator.mediaDevices.getUserMedia({video: true, audio: false}, function(stream) {
    var SimplePeer = require('simple-peer')
    var peer = new SimplePeer({
        initiator: window.location.hash === "#init",
        trickle: false,
        stream: stream
    })
    

    peer.on('signal', function(data) {
        console.log('signal', JSON.stringify(data))
        document.getElementById('yourId').value = JSON.stringify(data)
    })

    document.getElementById('connect').addEventListener('click', function() {
        var otherId = JSON.parse(document.getElementById('otherId').value)
        peer.signal(otherId)
    })

    document.getElementById('send').addEventListener('click', function() {
        var yourMessage = document.getElementById('yourMessage').value
        peer.send(yourMessage)
    })

    peer.on('data', function(data) {
        document.getElementById('messages').textContext += data + '\n'
    })

    peer.on('stream', function(stream) {
        var video = document.createElement('video')
        document.body.appendChild(video)

        video.src = window.URL.createObjectURL(stream)
        video.play();
    })
    }, function(err) {
        console.error(err)
    });
    
// }}};

// export default VideoRules