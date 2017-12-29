const counterRoutes = require('./counter');

module.exports = function (app, connection) {
  counterRoutes(app, connection);
};
