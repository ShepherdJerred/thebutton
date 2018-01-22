const Counter = require('../../../src/models/counter');

class CounterDao {
  constructor(connection) {
    this.connection = connection;
  }

  select(uuid) {
    this.connection.query('SELECT * FROM counter WHERE counter_uuid = ?', [uuid], (error, results, fields) => {
      if (error) {
        throw error;
      }
      return results[0];
    });
  }

  getActiveCounter() {
    this.connection.query('SELECT * FROM setting WHERE setting_key = ?', ['active_counter'], (error, results, fields) => {
      if (error) {
        throw error;
      }
      console.log("Active: " + results);
      if (results.length > 0) {
        console.log(results[0].setting_value);
        return results[0].setting_value;
      }
    });
  }

  create(counter) {
    this.connection.query('INSERT INTO counter VALUES (?, ?, ?)', [counter.uuid, counter.currentValue, counter.maxValue], (error, results, fields) => {
      if (error) {
        throw error;
      }
    });
  }

  updateCurrent(counter) {
    this.connection.query('UPDATE counter SET current_value = ? WHERE counter_uuid = ?', [counter.currentValue, counter.uuid], (error, results, fields) => {
      if (error) {
        throw error;
      }
    });
  }

  updateMax(counter) {
    this.connection.query('UPDATE counter SET max_value = ? WHERE counter_uuid = ?', [counter.maxValue, counter.uuid], (error, results, fields) => {
      if (error) {
        throw error;
      }
    });
  }

  setAsActiveCounter(counter) {
    this.connection.query('INSERT INTO setting VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?', ['active_counter', counter.uuid, counter.uuid], (error, results, fields) => {
      if (error) {
        throw error;
      }
    });
  }
}

module.exports = CounterDao;
