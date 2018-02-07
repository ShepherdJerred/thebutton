const io = require('socket.io');
const log = require('loglevel');
const port = process.env.PORT || 8080;

let app = io(port);
log.setLevel(log.levels.INFO);

const manager = require('./database/manager');
let database = manager.connect();
manager.migrate(database);

app.on('connection', socket => {
  let events = require('./sockets/events')(socket, database);
  socket.on('getCounter', events.getCounter);
  socket.on('incrementCounter', events.incrementCounter);
});

log.info('socket.io is listening on port ' + port);
