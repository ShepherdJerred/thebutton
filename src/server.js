const io = require('socket.io');
const log = require('loglevel');
const port = process.env.PORT || 8080;
const Raven = require('raven');

if (process.env.SENTRY_DSN) {
  Raven.config(process.env.SENTRY_DSN).install();
}

let app = io(port);
log.setLevel(log.levels.DEBUG);

require('./database/index').then((connection) => {
  app.on('connection', socket => {
    require('./sockets/events')(app, socket, connection);
  });

  log.info('socket.io is listening on port ' + port);
});
