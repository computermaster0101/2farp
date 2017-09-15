'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class;

var _sequelizeClasses = require('sequelize-classes');

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _Role = require('./Role');

var _Role2 = _interopRequireDefault(_Role);

var _CellCarrier = require('./CellCarrier');

var _CellCarrier2 = _interopRequireDefault(_CellCarrier);

var _AccessGroup = require('./AccessGroup');

var _AccessGroup2 = _interopRequireDefault(_AccessGroup);

var _NotificationType = require('./NotificationType');

var _NotificationType2 = _interopRequireDefault(_NotificationType);

var _Status = require('./Status');

var _Status2 = _interopRequireDefault(_Status);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var User = (_dec = (0, _sequelizeClasses.paranoid)(true), _dec2 = (0, _sequelizeClasses.option)('timestamps', true), _dec3 = (0, _sequelizeClasses.option)('createdAt', false), _dec4 = (0, _sequelizeClasses.option)('version', true), _dec5 = (0, _sequelizeClasses.belongsTo)('Role'), _dec6 = (0, _sequelizeClasses.belongsTo)('CellCarrier'), _dec7 = (0, _sequelizeClasses.belongsTo)('AccessGroup'), _dec8 = (0, _sequelizeClasses.belongsTo)('NotificationType'), _dec9 = (0, _sequelizeClasses.belongsTo)('Status'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = _dec8(_class = _dec9(_class = function (_Model) {
  _inherits(User, _Model);

  function User() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, User);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = User.__proto__ || Object.getPrototypeOf(User)).call.apply(_ref, [this].concat(args))), _this), _this.id = {
      type: _sequelize2.default.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
      validate: {
        isInt: true
      }
    }, _this.first = {
      type: _sequelize2.default.STRING(32),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }, _this.last = {
      type: _sequelize2.default.STRING(32),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }, _this.phone = {
      type: _sequelize2.default.INTEGER(10),
      allowNull: false,
      validate: {
        isInt: true
      }
    }, _this.email = {
      type: _sequelize2.default.STRING(64),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    }, _this.username = {
      type: _sequelize2.default.STRING(64),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    }, _this.password = {
      type: _sequelize2.default.STRING(64),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isAlphanumeric: true,
        isLowercase: true
      }
    }, _this.key = {
      type: _sequelize2.default.STRING(32),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isAlphanumeric: true,
        isUppercase: true
      }
    }, _this.salt = {
      type: _sequelize2.default.STRING(64),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isAlphanumeric: true,
        isLowercase: true
      }
    }, _this.qrData = {
      type: _sequelize2.default.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    }, _this.lastAttempt = {
      type: _sequelize2.default.INTEGER,
      allowNull: true,
      validate: {
        isInt: true
      }
    }, _this.failedAttempts = {
      type: _sequelize2.default.INTEGER(2),
      allowNull: true,
      validate: {
        isInt: true
      }
    }, _this.accountResetPassphraseOne = { //could allow unlock/reset passphrases if users forget passwords, they can unlock their own account. (aka hash answers to 'secret' questions)
      type: _sequelize2.default.STRING(64),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isAlphanumeric: true,
        isLowercase: true
      }
    }, _this.accountResetPassphraseTwo = { //could allow unlock/reset passphrases if users forget passwords, they can unlock their own account. (aka hash answers to 'secret' questions)
      type: _sequelize2.default.STRING(64),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isAlphanumeric: true,
        isLowercase: true
      }
    }, _this.passwordReset = { //could epochTime.sessionId: ie 1504918297137.342 where session.userId and this.sessionId match to prevent excessive notifications. epochTime is when the password will expire. upon session creation, will calculate if notification should be sent using the setting [notify user password will expire in X days]
      type: _sequelize2.default.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true
      }
    }, _this.createdBy = {
      type: _sequelize2.default.STRING,
      defaultValue: 'System',
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }, _this.updatedBy = {
      type: _sequelize2.default.STRING,
      defaultValue: 'System',
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return User;
}(_sequelizeClasses.Model)) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = User;