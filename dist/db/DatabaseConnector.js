'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sequelizeClasses = require('sequelize-classes');

var _User = require('../domain/User');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var options = {
  database: "2farp",
  username: "root",
  pass: "toor",
  config: {
    host: "localhost",
    port: 3306,
    logging: false,
    dialect: "mysql2"
  }
};

var instance = null;

var DatabaseConnector = function () {
  function DatabaseConnector() {
    _classCallCheck(this, DatabaseConnector);

    if (!instance) {
      instance = this;
      this.db = new _sequelizeClasses.Builder(options, [_User.User]);
    }
    return this;
  }

  _createClass(DatabaseConnector, null, [{
    key: 'getInstance',
    value: function getInstance() {
      if (!instance) {
        instance = new DatabaseConnector();
      }
      return instance.db;
    }
  }]);

  return DatabaseConnector;
}();

exports.default = DatabaseConnector;