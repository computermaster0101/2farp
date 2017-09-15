'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _class, _temp;

var _DatabaseConnector = require('../db/DatabaseConnector');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RoleService = (_temp = _class = function RoleService() {
  _classCallCheck(this, RoleService);
}, _class.addDefaults = function () {
  return _DatabaseConnector.Role.bulkCreate([{ name: 'admin' }, { name: 'user' }]);
}, _temp);
exports.default = RoleService;