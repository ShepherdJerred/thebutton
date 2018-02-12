const io = require('socket.io');
const loglevel = require('loglevel');

module.exports = function (connection, port) {
  let app = io(port);

  // TODO only allow certain domains to do CORS
  app.origins('*:*');

  app.on('connection', socket => {
    require('./sockets/events')(app, socket, connection);
  });

  loglevel.info('socket.io is listening on port ' + port);
};
