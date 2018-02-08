module.exports = function (app, socket, database) {
  let controller = require('./controller')(database);

  function getCounter () {
    controller.getCounter().then((counter) => {
      socket.emit('counterStatus', counter);
    });
  }

  function incrementCounter () {
    controller.incrementCounter().then((result) => {
      app.sockets.emit('counterStatus', result.counter);
      if (result.reward) {
        socket.emit('reward', 'puppy');
      }
    });
  }

  socket.on('getCounter', getCounter);
  socket.on('incrementCounter', incrementCounter);
};
