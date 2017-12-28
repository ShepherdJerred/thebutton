const counterRoutes = require('./counter-routes');

module.exports = function (app, database) {
  counterRoutes(app, database);
};
