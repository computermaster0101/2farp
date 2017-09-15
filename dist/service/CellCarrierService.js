'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _class, _temp;

var _DatabaseConnector = require('../db/DatabaseConnector');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CellCarrierService = (_temp = _class = function CellCarrierService() {
  _classCallCheck(this, CellCarrierService);
}, _class.addDefaults = function () {
  return _DatabaseConnector.CellCarrier.bulkCreate([{ name: 'Verizon', domain: 'vzwpix.com' }]);
}, _temp);
exports.default = CellCarrierService;