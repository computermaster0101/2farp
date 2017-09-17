'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _class, _temp;

var _DatabaseConnector = require('../db/DatabaseConnector');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StatusService = (_temp = _class = function StatusService() {
  _classCallCheck(this, StatusService);
}, _class.addDefaults = function () {
  return _DatabaseConnector.Status.bulkCreate([{ name: 'Incomplete' }, { name: 'Complete' }, { name: 'Locked' }, { name: 'Revoked' }]);
}, _temp);
exports.default = StatusService;