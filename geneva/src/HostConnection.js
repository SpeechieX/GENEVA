var SimplePeer = require('simple-peer');
var SimpleWebsocket = require('simple-websocket');
var EventEmitter = require('events').EventEmitter;


var peers = [];
var emitter = newEventEmitter();

module.exports = function() {
    var socket = new SimpleWebsocket('ws://localhost:3002');
    socket.on('close', function() { console.log('Socket Closed') });
    socket.on('error', function(err) { console.log('Socket error'); console.log(err); });
    socket.on('connect', function() { console.log('Successful Connection'); });

    socket.on('data', function(data) {
        var rtc = new SimplePeer({ initiator: false, trickle: false});

        rtc.signal(data);
        rtc.on('signal', function(data) {
            socket.send(data);
        });

        rtc.on('connect', function() {
            peers.push(rtc);
        });

        rtc.on('data', function(msg) {
            emitter.emit('message', msg);

            //Show data to all peers
            peers.forEach(function(p) {
                if(p === rtc) {
                    return;
                }
                p.send(msg);
            });
        });

    });

    return {
        onReady: function(cb) {

            cb();
        },

        send: function(message) {
            peers.forEach(function(p) {p.send(message); });
        },

        onMessage: function(cb) {
            emitter.on('message', cb);
        }
    };
    
            

};

