'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _class, _temp;

var _DatabaseConnector = require('../db/DatabaseConnector');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NotificationTypeService = (_temp = _class = function NotificationTypeService() {
  _classCallCheck(this, NotificationTypeService);
}, _class.addDefaults = function () {
  return _DatabaseConnector.NotificationType.bulkCreate([{ name: 'email' }, { name: 'phone' }]);
}, _temp);
exports.default = NotificationTypeService;