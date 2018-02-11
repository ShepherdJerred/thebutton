const Counter = require.main.require('./models/counter');
const Setting = require.main.require('./models/setting');
const uuid = require('uuid/v4');

module.exports = function (database) {
  const counterDao = require.main.require('./database/dao/counterDao')(database);
  const settingDao = require.main.require('./database/dao/settingDao')(database);

  let getCounter = async function getCounter () {
    let counter;
    let setting = await settingDao.select('active_counter');

    if (setting) {
      counter = counterDao.select(setting.settingValue);
    } else {
      counter = new Counter(uuid(), 0, 1);
      counterDao.insert(counter);
      settingDao.insert(new Setting('active_counter', counter.uuid));
    }

    return counter;
  };

  let incrementCounter = async function () {
    let counter;
    let reward = false;
    let setting = await settingDao.select('active_counter');

    if (setting) {
      counter = await counterDao.select(setting.settingValue);
    } else {
      counter = new Counter(uuid(), 0, 1);
      counterDao.insert(counter);
      settingDao.insert(new Setting('active_counter', counter.uuid));
    }

    counter.currentValue++;
    counterDao.setCurrentValue(counter);

    if (counter.maxValue < counter.currentValue) {
      counter.maxValue *= 2;
      counterDao.setMaxValue(counter);
      reward = true;
    }

    return {
      counter,
      reward
    };
  };

  return {
    getCounter,
    incrementCounter
  };
};
