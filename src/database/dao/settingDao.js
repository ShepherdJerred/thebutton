const Setting = require.main.require('./models/setting');

module.exports = function (database) {
  function select (settingKey, callback) {
    database.query('SELECT * FROM setting WHERE setting_key = ?', ['active_counter'], (error, results, fields) => {
      if (error) {
        throw error;
      }
      if (results[0]) {
        callback(new Setting(results[0]['setting_key'], results[0]['setting_value']));
      } else {
        callback(null);
      }
    });
  }

  function insert (setting) {
    database.query('INSERT INTO setting VALUES (?, ?)', [setting.settingKey, setting.settingValue], (error, results, fields) => {
      if (error) {
        throw error;
      }
    });
  }

  return {
    select,
    insert
  };
};
