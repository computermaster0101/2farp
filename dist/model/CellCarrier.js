'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _sequelizeClasses = require('sequelize-classes');

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CellCarrier = function (_Model) {
  _inherits(CellCarrier, _Model);

  function CellCarrier() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CellCarrier);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CellCarrier.__proto__ || Object.getPrototypeOf(CellCarrier)).call.apply(_ref, [this].concat(args))), _this), _this.id = {
      type: _sequelize2.default.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
      validate: {
        isInt: true
      }
    }, _this.name = {
      type: _sequelize2.default.STRING(32),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    }, _this.domain = {
      type: _sequelize2.default.STRING(32),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return CellCarrier;
}(_sequelizeClasses.Model);

exports.default = CellCarrier;