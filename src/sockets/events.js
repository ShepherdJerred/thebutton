module.exports = function (socket, database) {
  let controller = require('./controller')(database);

  function getCounter () {
    let counter = controller.getCounter();
    socket.emit('counterStatus', counter);
  }

  function incrementCounter () {
    let counter = controller.incrementCounter();
    socket.emit('counterStatus', counter);
  }

  return {
    getCounter,
    incrementCounter
  };
};
