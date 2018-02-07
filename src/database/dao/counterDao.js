const Counter = require.main.require('./models/counter');

module.exports = function (database) {
  function select (uuid, callback) {
    database.query('SELECT * FROM counter WHERE counter_uuid = ?;', [uuid], (error, results, fields) => {
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

  function insert (counter) {
    database.query('INSERT INTO counter VALUES (?, ?, ?);', [counter.uuid, counter.currentValue, counter.maxValue], (error, results, fields) => {
      if (error) {
        throw error;
      }
    });
  }

  function setCurrentValue (counter) {
    database.query('UPDATE counter SET current_value = ? WHERE counter_uuid = ?;', [counter.currentValue, counter.uuid], (error, results, fields) => {
      if (error) {
        throw error;
      }
    });
  }

  function setMaxValue (counter) {
    database.query('UPDATE counter SET max_value = ? WHERE counter_uuid = ?;', [counter.maxValue, counter.uuid], (error, results, fields) => {
      if (error) {
        throw error;
      }
    });
  }

  return {
    select,
    insert,
    setCurrentValue,
    setMaxValue
  };
};
