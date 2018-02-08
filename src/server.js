const io = require('socket.io');
const log = require('loglevel');
const port = process.env.PORT || 8080;

let app = io(port);
log.setLevel(log.levels.DEBUG);

require('./database/index').then((connection) => {
  app.on('connection', socket => {
    let events = require('./sockets/events')(socket, connection);
    socket.on('getCounter', events.getCounter);
    socket.on('incrementCounter', events.incrementCounter);
  });

  log.info('socket.io is listening on port ' + port);
});
