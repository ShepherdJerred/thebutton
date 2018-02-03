const CounterDao = require('./database/dao/counterDao');
const Counter = require('./models/counter');
const database = require('./database/index');
const io = require('socket.io');
const SettingDao = require('./database/dao/settingDao');
const Setting = require('./models/setting');
const uuid = require('uuid/v4');

const port = process.env.PORT || 8080;

let app = io(port);
let connection = database.connect();
database.migrate(connection);

let counterDao = new CounterDao(connection);
let settingDao = new SettingDao(connection);

// TODO split this up
// https://stackoverflow.com/questions/20466129/how-to-organize-socket-handling-in-node-js-and-socket-io-app
app.on('connection', function (socket) {
  console.log('a user connected');

  socket.on('get counter', function () {
    let counter;

    settingDao.select('active_counter', setting => {
      if (setting) {
        counterDao.select(setting.settingValue, selectedCounter => {
          counter = selectedCounter;
          socket.emit('counter status', counter);
        });
      } else {
        counter = new Counter(uuid(), 0, 1);
        counterDao.insert(counter);
        settingDao.insert(new Setting('active_counter', counter.uuid));
        socket.emit('counter status', counter);
      }
    });
  });

  socket.on('disconnect', function () {
    console.log('a user disconnected');
  });

  socket.on('button click', function () {
    let counter;
    let counterUuid;

    settingDao.select('active_counter', setting => {
      counterUuid = setting.settingValue;

      if (counterUuid) {
        counterDao.select(counterUuid, selectedCounter => {
          counter = selectedCounter;
          counter.currentValue++;
          counterDao.setCurrentValue(counter);

          if (counter.maxValue < counter.currentValue) {
            counter.maxValue *= 2;
            counterDao.setMaxValue(counter);
          }

          app.sockets.emit('counter status', counter);
        });
      } else {
        counterUuid = uuid();
        counter = new Counter(counterUuid, 0, 1);
        counterDao.insert(counter);
        settingDao.insert(new Setting('active_counter', counterUuid));

        counter.currentValue++;
        counterDao.setCurrentValue(counter);

        if (counter.maxValue < counter.currentValue) {
          counter.maxValue *= 2;
          counterDao.setMaxValue(counter);
        }

        app.sockets.emit('counter status', counter);
      }
    });
  });
});
