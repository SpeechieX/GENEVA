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

      socket.on('offer', function(payload) {

        console.log(`${Date.now()}: offer message received on server`)
        console.log(`${Date.now()}: now going to send 'offer' message to this socketId: ${payload.answererSocketId}`)
        
        // answererSocketId is the user to receive the offer
        io.to(payload.answererSocketId).emit('offer', payload);
      });
      
      socket.on('answer', function(payload) {
        
        console.log(`${Date.now()}: answer message received on server`)
        console.log(`${Date.now()}: now going to send 'answer' message to this socketId: ${payload.offererSocketId}`)

        io.to(payload.offererSocketId).emit('answer', payload);
      });
  
  });

  

};