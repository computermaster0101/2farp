'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _class, _temp;

var _DatabaseConnector = require('../db/DatabaseConnector');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AccessGroupRuleService = (_temp = _class = function AccessGroupRuleService() {
  _classCallCheck(this, AccessGroupRuleService);
}, _class.addDefaults = function (accessGroupId, routeId) {

  _DatabaseConnector.AccessGroupRule.create({ AccessGroupId: accessGroupId, RouteId: routeId });
}, _temp);
exports.default = AccessGroupRuleService;