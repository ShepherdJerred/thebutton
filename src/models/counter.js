class Counter {
  constructor(uuid) {
    this.uuid = uuid;
  }
  select(connection, uuid) {
    connection.query('SELECT * FROM counter WHERE counter_uuid = ?', [req.params.counter_uuid], function (error, results, fields) {
      if (error) {
        res.status(500).send(error.code);
        throw error;
      }
      res.send({
        counter: results[0]
      });
    });
  }
  create(connection, counter) {
    connection.query('INSERT INTO counter VALUES (?, ?, ?)', [defaultCounter.counter_uuid, defaultCounter.current_value, defaultCounter.max_value], function (error, results, fields) {
      if (error) {
        res.status(500).send(error.code);
        throw error;
      }
    });
  }
  updateCurrent(connection, counter) {

  }
  updateMax() {

  }
  getActiveCounter(connection) {
    connection.query('SELECT * FROM setting WHERE setting_key = ?', ['active_counter'], function (error, results, fields) {
      if (error) {
        res.status(500).send(error.code);
        throw error;
      }
      let value = results[0].setting_value;
      res.send({
        active_counter_uuid: value
      });
    });
  }
  setActiveCounter(connection) {
    connection.query('INSERT INTO setting VALUES (?, ?)', ['active_counter', defaultCounter.counter_uuid], function (error, results, fields) {
      if (error) {
        res.status(500).send(error.code);
        throw error;
      }
    });
  }
}
