const uuid = require('uuid/v4');

module.exports = function (app, connection) {
  app.get('/counters/active', (req, res) => {

  });
  app.get('/counters/:counter_uuid', (req, res) => {

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
