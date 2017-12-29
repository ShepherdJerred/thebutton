const uuid = require('uuid/v4');

module.exports = function (app, connection) {
  app.get('/counters/active', (req, res) => {
    connection.query('SELECT * FROM setting WHERE setting_key = ?', ['active_counter'], function (error, results, fields) {
      if (error) {
        res.status(500).send(error.code);
        throw error;
      }
      if (results.length === 0) {
        let defaultCounter = {
          counter_uuid: uuid(),
          current_value: 0,
          max_value: 1
        };
        connection.query('INSERT INTO counter VALUES (?, ?, ?)', [defaultCounter.counter_uuid, defaultCounter.current_value, defaultCounter.max_value], function (error, results, fields) {
          if (error) {
            res.status(500).send(error.code);
            throw error;
          }
        });
        connection.query('INSERT INTO setting VALUES (?, ?)', ['active_counter', defaultCounter.counter_uuid], function (error, results, fields) {
          if (error) {
            res.status(500).send(error.code);
            throw error;
          }
        });
        let value = defaultCounter.counter_uuid;
        res.send({
          active_counter_uuid: value
        });
        return;
      }
      let value = results[0].setting_value;
      res.send({
        active_counter_uuid: value
      });
    });
  });
  app.get('/counters/:counter_uuid', (req, res) => {
    connection.query('SELECT * FROM counter WHERE counter_uuid = ?', [req.params.counter_uuid], function (error, results, fields) {
      if (error) {
        res.status(500).send(error.code);
        throw error;
      }
      res.send({
        counter: results[0]
      });
    });
  });
  app.post('/counters/:counter_uuid', (req, res) => {
    connection.query('SELECT * FROM counter WHERE counter_uuid = ?', [req.params.counter_uuid], function (error, results, fields) {
      if (error) {
        res.status(500).send(error.code);
        throw error;
      }
      let counter = {
        counter_uuid: results[0].counter_uuid,
        current_value: results[0].current_value,
        max_value: results[0].max_value
      };
      if (counter.current_value === counter.max_value) {
        connection.query('SELECT * FROM setting WHERE setting_key = ?', ['active_counter'], function (error, results, fields) {
          if (error) {
            res.status(500).send(error.code);
            throw error;
          }
          counter.max_value = counter.max_value * 2;
          connection.query('UPDATE counter SET max_value = ? WHERE counter_uuid = ?', [counter.max_value, counter.counter_uuid], function (error, results, fields) {
            if (error) {
              res.status(500).send(error.code);
              throw error;
            }
          });
        });
      }
      counter.current_value = counter.current_value + 1;
      connection.query('UPDATE counter SET current_value = ? WHERE counter_uuid = ?', [counter.current_value, counter.counter_uuid], function (error, results, fields) {
        if (error) {
          res.status(500).send(error.code);
          throw error;
        }
        res.send({
          counter: counter
        });
      });
    });
  });
};
