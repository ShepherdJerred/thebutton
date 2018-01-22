const express = require('express');
const bodyParser = require('body-parser');

const database = require('./src/database');

let connection = database.connect();
database.migrate(connection);

const app = express();
const port = process.env.PORT || 8080;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

require('./src/routes')(app, connection);

app.use(bodyParser.urlencoded({extended: true}));
app.listen(port, () => {
  console.log('Now listening on port ' + port);
});
