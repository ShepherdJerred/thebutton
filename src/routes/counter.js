const uuid = require('uuid/v4');
const CounterDao = require('../../src/database/dao/counterDao');
const Counter = require('../../src/models/counter');

module.exports = function (app, connection) {
  let dao = new CounterDao(connection);
  app.get('/counter', (req, res) => {
    let counter;
    let counterUuid = dao.getActiveCounter();
    console.log("Result: " + counterUuid);
    if (counterUuid) {
      counter = dao.select(counterUuid);
    } else {
      counter = new Counter(uuid(), 0, 1);
      dao.create(counter);
      dao.setAsActiveCounter(counter);
    }
    res.send(counter);
  });
  app.post('/counter', (req, res) => {
    let counter;
    let counterUuid = dao.getActiveCounter();
    if (counterUuid) {
      counter = dao.select(counterUuid);
    } else {
      counter = new Counter(uuidv4(), 0, 1);
      dao.setAsActiveCounter(counter);
    }
    counter.currentValue++;
    dao.updateCurrent(counter);
    if (counter.maxValue < counter.currentValue) {
      counter.maxValue *= 2;
      dao.updateMax(counter);
    }
    res.send(counter);
  });
};
