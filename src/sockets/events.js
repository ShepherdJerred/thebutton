const log = require('loglevel');

module.exports = function (socket, database) {
  let controller = require('./controller')(database);

  function getCounter () {
    controller.getCounter().then((counter) => {
      socket.emit('counterStatus', counter);
    });
  }

  function incrementCounter () {
    controller.incrementCounter().then((counter) => {
      socket.emit('counterStatus', counter);
    });
  }

  return {
    getCounter,
    incrementCounter
  };
};
