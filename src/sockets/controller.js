const CounterDao = require('../database/dao/counterDao');
const Counter = require('../models/counter');
const SettingDao = require('../database/dao/settingDao');
const Setting = require('../models/setting');
const uuid = require('uuid/v4');

module.exports = function (database) {
  let counterDao = new CounterDao(database);
  let settingDao = new SettingDao(database);

  let getCounter = function getCounter () {
    let counter;
    settingDao.select('active_counter', setting => {
      if (setting) {
        counterDao.select(setting.settingValue, selectedCounter => {
          counter = selectedCounter;
          return counter;
        });
      } else {
        counter = new Counter(uuid(), 0, 1);
        counterDao.insert(counter);
        settingDao.insert(new Setting('active_counter', counter.uuid));
        return counter;
      }
    });
  };

  let incrementCounter = function () {
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
          return counter;
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
        return counter;
      }
    });
  };

  return {
    getCounter,
    incrementCounter
  };
};
