const Setting = require.main.require('../src/models/setting');

class SettingDao {
  constructor (connection) {
    this.connection = connection;
  }

  select (settingKey, callback) {
    this.connection.query('SELECT * FROM setting WHERE setting_key = ?', ['active_counter'], (error, results, fields) => {
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

  insert (setting) {
    this.connection.query('INSERT INTO setting VALUES (?, ?)', [setting.settingKey, setting.settingValue], (error, results, fields) => {
      if (error) {
        throw error;
      }
    });
  }
}

module.exports = SettingDao;
