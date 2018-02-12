const mysql = require('mysql2/promise');

let mysqlConfig;
if (process.env.NODE_ENV === 'production') {
  mysqlConfig = process.env.CLEARDB_DB_URL;
} else {
  mysqlConfig = require.main.require('../config/database.js');
}

module.exports = (async function () {
  const connection = await mysql.createConnection(mysqlConfig);

  let tables = [
    'CREATE TABLE IF NOT EXISTS setting (setting_key VARCHAR(255) UNIQUE, setting_value VARCHAR(255));',
    'CREATE TABLE IF NOT EXISTS counter (counter_uuid CHAR(36) UNIQUE, current_value INT, max_value INT);'
  ];

  for (let table of tables) {
    connection.query(table);
  }

  return connection;
})();
