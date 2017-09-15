'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _class, _temp;

var _DatabaseConnector = require('../db/DatabaseConnector');

var _OptionService = require('../service/OptionService');

var _OptionService2 = _interopRequireDefault(_OptionService);

var _StatusService = require('../service/StatusService');

var _StatusService2 = _interopRequireDefault(_StatusService);

var _RoleService = require('../service/RoleService');

var _RoleService2 = _interopRequireDefault(_RoleService);

var _NotificationTypeService = require('../service/NotificationTypeService');

var _NotificationTypeService2 = _interopRequireDefault(_NotificationTypeService);

var _AccessGroupService = require('../service/AccessGroupService');

var _AccessGroupService2 = _interopRequireDefault(_AccessGroupService);

var _RouteService = require('../service/RouteService');

var _RouteService2 = _interopRequireDefault(_RouteService);

var _CellCarrierService = require('../service/CellCarrierService');

var _CellCarrierService2 = _interopRequireDefault(_CellCarrierService);

var _AccessGroupRuleService = require('../service/AccessGroupRuleService');

var _AccessGroupRuleService2 = _interopRequireDefault(_AccessGroupRuleService);

var _UserService = require('../service/UserService');

var _UserService2 = _interopRequireDefault(_UserService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TwoFactorAuthenticationReverseProxy = (_temp = _class = function TwoFactorAuthenticationReverseProxy() {
  _classCallCheck(this, TwoFactorAuthenticationReverseProxy);
}, _class.databaseBuilder = function () {
  _DatabaseConnector.Database.authenticate().then(function () {
    return console.log('Beginning database sync');
  }).then(function () {
    return _DatabaseConnector.Database.sync({ force: true, match: /_dev$/ });
  }).then(function () {
    return console.log('Creating Database');
  }).then(function () {
    return _OptionService2.default.addDefaults();
  }).then(function () {
    return _StatusService2.default.addDefaults();
  }).then(function () {
    return _RoleService2.default.addDefaults();
  }).then(function () {
    return _NotificationTypeService2.default.addDefaults();
  }).then(function () {
    return _AccessGroupService2.default.addDefaults();
  }).then(function () {
    return _RouteService2.default.addDefaults();
  }).then(function () {
    return _CellCarrierService2.default.addDefaults();
  }).then(function () {
    return console.log('Database Created');
  });
}, _temp);
exports.default = TwoFactorAuthenticationReverseProxy;