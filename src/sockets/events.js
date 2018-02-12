module.exports = function (app, socket, database) {
  let controller = require('./controller')(database);

  let rewards = [
    'puppy',
    'kitty'
    // theme
  ];

  function getConnectedUsers () {
    socket.emit('connectedUsers', controller.getConnectedUsers());
  }

  function incrementConnectedUsers () {
    controller.incrementConnectedUsers();
    app.sockets.emit('connectedUsers', controller.getConnectedUsers());
  }

  function decrementConnectedUsers () {
    controller.decrementConnectedUsers();
    app.sockets.emit('connectedUsers', controller.getConnectedUsers());
  }

  function getCounter () {
    controller.getCounter().then((counter) => {
      socket.emit('counterStatus', counter);
    });
  }

  function incrementCounter () {
    controller.incrementCounter().then((result) => {
      app.sockets.emit('counterStatus', result.counter);
      if (result.reward) {
        socket.emit('reward', rewards[Math.floor(Math.random() * rewards.length)]);
      }
    });
  }

  incrementConnectedUsers();
  socket.on('getCounter', getCounter);
  socket.on('incrementCounter', incrementCounter);
  socket.on('getConnectedUsers', getConnectedUsers);
  socket.on('disconnect', decrementConnectedUsers);
};
