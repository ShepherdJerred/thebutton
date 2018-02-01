const uuid = require('uuid/v4');
const CounterDao = require('../../src/database/dao/counterDao');
const SettingDao = require('../../src/database/dao/settingDao');
const Counter = require('../../src/models/counter');
const Setting = require('../../src/models/setting');

module.exports = function (app, connection) {
  let counterDao = new CounterDao(connection);
  let settingDao = new SettingDao(connection);

  app.get('/counter', (req, res) => {
    let counter;

    settingDao.select('active_counter', setting => {
      if (setting) {
        counterDao.select(setting.settingValue, selectedCounter => {
          counter = selectedCounter;
          res.send(counter);
        });
      } else {
        counter = new Counter(uuid(), 0, 1);
        counterDao.insert(counter);
        settingDao.insert(new Setting('active_counter', counter.uuid));
        res.send(counter);
      }
    });
  });

  app.post('/counter', (req, res) => {
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

          res.send(counter);
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

        res.send(counter);
      }
    });
  });
};
