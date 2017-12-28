const express = require('express');
const bodyParser = require('body-parser');
const database = require('config/database');

const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect('mongodb://' + database.host + ':' + database.port, (error, db) => {
  if (error) {
    return console.log(error);
  }
  require('./app/routes')(app, db);
  app.listen(port, () => {
    console.log('Now listening on port ' + port + '!');
  });
});
