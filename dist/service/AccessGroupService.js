'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _class, _temp;

var _DatabaseConnector = require('../db/DatabaseConnector');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AccessGroupService = (_temp = _class = function AccessGroupService() {
  _classCallCheck(this, AccessGroupService);
}, _class.addDefaults = function () {
  return _DatabaseConnector.AccessGroup.create({ name: 'Default' });
}, _temp);
exports.default = AccessGroupService;