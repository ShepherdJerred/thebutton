const mysql = require('mysql');
const mysqlConfig = require.main.require('../config/database.js');

function connect () {
  let database = mysql.createConnection(mysqlConfig);
  database.connect();
  return database;
}

function migrate (database) {
  let tables = [
    'CREATE TABLE IF NOT EXISTS setting (setting_key VARCHAR(255) UNIQUE, setting_value VARCHAR(255));',
    'CREATE TABLE IF NOT EXISTS counter (counter_uuid CHAR(36) UNIQUE, current_value INT, max_value INT);'
  ];
  for (let table of tables) {
    database.query(table, [], function (error, results, fields) {
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
