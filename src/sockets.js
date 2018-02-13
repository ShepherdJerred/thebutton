const socketio = require('socket.io');
const loglevel = require('loglevel');

module.exports = function (connection, port) {
  let io = socketio(port);

  // TODO only allow certain domains to do CORS
  io.origins('*:*');

  io.on('connection', socket => {
    require('./sockets/events')(io, socket, connection);
  });

  loglevel.info('socket.io is listening on port ' + port);
};
