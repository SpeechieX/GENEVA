var SimplePeer = require('simple-peer');
var SimpleWebsocket = require('simple-websocket');
var EventEmitter = require('events').EventEmitter;


var emitter = newEventEmitter();

module.exports = function() {
    var socket = new SimpleWebsocket('ws://localhost:3002');
    var rtc;
    socket.on('close', function() {console.log('Socket Closed');});
    socket.on('error', function(err) {console.log('Socket error'); console.log(err); });

    socket.on('connect', function() {
        rtc = new SimplePeer({ initiator: true, trickle: false });
        rtc.on('signal', function(data) {
            rtc.signal(data);
        });

        rtc.on('connect', function() {
            emitter.emit('connected');
            socket.destroy();
        });

        rtc.on('data', function(message) {
            emitter.emit('message', message);
        });
    });

    return {
        onReady: function(cb) {
            emitter.on('connected', cb);
        },

        send: function(message) {
            rtc.send(message);
        },

        onMessage: function(cb) {
            emitter.on('message', cb);
        }
    };
};
    
