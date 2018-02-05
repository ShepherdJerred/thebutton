const io = require('socket.io');
const port = process.env.PORT || 8080;

let app = io(port);

const manager = require('./database/manager');
let connection = manager.connect();
manager.migrate(connection);

app.on('connection', socket => {
  let events = require('./sockets/events')(socket, connection);
  socket.on('getCounter', events.getCounter);
  socket.on('incrementCounter', events.incrementCounter);
});
