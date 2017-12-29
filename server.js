const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const mysqlConfig = require('./config/database');

const connection = mysql.createConnection(mysqlConfig);
connection.connect();

connection.query('CREATE TABLE IF NOT EXISTS setting (setting_key VARCHAR(255), setting_value VARCHAR(255))', [], function (error, results, fields) {
  if (error) {
    throw error;
  }
});

connection.query('CREATE TABLE IF NOT EXISTS counter (counter_uuid CHAR(36), current_value INT, max_value INT)', [], function (error, results, fields) {
  if (error) {
    throw error;
  }
});

const app = express();
const port = process.env.PORT || 8080;

require('./app/routes')(app, connection);

app.use(bodyParser.urlencoded({extended: true}));
app.listen(port, () => {
  console.log('Now listening on port ' + port + '!');
});
