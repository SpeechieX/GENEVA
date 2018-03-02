module.exports = function(httpServer) {

    var io = require('socket.io')(httpServer);

    // object to track users's email
    var users = {};
    
    io.on('connection', function (socket) {

    
        socket.on('register-user', function (email) {
          // each socket has a unique id
          users[socket.id] = email;
          io.emit('update-user-list', Object.keys(users).map(id => ({socketId: id, email: users[id]})));
        });
    
        // when the player disconnects, remove key & notify clients
        socket.on('disconnect', function () {
          delete users[socket.id];
          io.emit('update-user-list', Object.keys(users).map(id => users[id]));
        });
    
    });

};