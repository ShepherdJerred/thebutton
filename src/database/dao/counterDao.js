const Counter = require('../../../src/models/counter');

class CounterDao {
  constructor (connection) {
    this.connection = connection;
  }

  select (uuid, callback) {
    this.connection.query('SELECT * FROM counter WHERE counter_uuid = ?;', [uuid], (error, results, fields) => {
      if (error) {
        throw error;
      }
      if (results[0]) {
        callback(new Counter(uuid, results[0]['current_value'], results[0]['max_value']));
      } else {
        callback(null);
      }
    });
  }

  insert (counter) {
    this.connection.query('INSERT INTO counter VALUES (?, ?, ?);', [counter.uuid, counter.currentValue, counter.maxValue], (error, results, fields) => {
      if (error) {
        throw error;
      }
    });
  }

  setCurrentValue (counter) {
    this.connection.query('UPDATE counter SET current_value = ? WHERE counter_uuid = ?;', [counter.currentValue, counter.uuid], (error, results, fields) => {
      if (error) {
        throw error;
      }
    });
  }

  setMaxValue (counter) {
    this.connection.query('UPDATE counter SET max_value = ? WHERE counter_uuid = ?;', [counter.maxValue, counter.uuid], (error, results, fields) => {
      if (error) {
        throw error;
      }
    });
  }
}

module.exports = CounterDao;
