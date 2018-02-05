const mysql = require('mysql');
const mysqlConfig = require('../../config/database');

function connect () {
  let connection = mysql.createConnection(mysqlConfig);
  connection.connect();
  return connection;
}

function migrate (connection) {
  let tables = [
    'CREATE TABLE IF NOT EXISTS setting (setting_key VARCHAR(255) UNIQUE, setting_value VARCHAR(255));',
    'CREATE TABLE IF NOT EXISTS counter (counter_uuid CHAR(36) UNIQUE, current_value INT, max_value INT);'
  ];
  for (let table of tables) {
    connection.query(table, [], function (error, results, fields) {
      if (error) {
        throw error;
      }
    });
  }
}

module.exports = {
  connect,
  migrate
};
