'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DatabaseConnector = require('../db/DatabaseConnector');

var _DatabaseConnector2 = _interopRequireDefault(_DatabaseConnector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utlis = function () {
  function Utlis() {
    _classCallCheck(this, Utlis);
  }

  _createClass(Utlis, [{
    key: 'createDatabase',
    value: function createDatabase() {
      var databaseConnector = _DatabaseConnector2.default.getInstance();
      databaseConnector.sync();
    }
  }]);

  return Utlis;
}();

exports.default = Utlis;