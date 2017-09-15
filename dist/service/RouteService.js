'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _class, _temp;

var _DatabaseConnector = require('../db/DatabaseConnector');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RouteService = (_temp = _class = function RouteService() {
  _classCallCheck(this, RouteService);
}, _class.addDefaults = function () {
  return _DatabaseConnector.Route.create({ name: 'Default', path: '/', destination: 'http://localhost:8080/', authenticated: false });
}, _temp);
exports.default = RouteService;