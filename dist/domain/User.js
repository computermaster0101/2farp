'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _sequelizeClasses = require('sequelize-classes');

var _sequelize = require('sequelize');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var User = function (_Model) {
  _inherits(User, _Model);

  /*  roleId = {
      type: INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        isInt: true
      },
      references: {
        model: Role,
        key: 'id'
      }
    }
    cellCarrierId = {
      type: INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        isInt: true
      },
      references: {
        model: CellCarrier,
        key: 'id'
      }
    }
    accessGroupId = {
      type: INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        isInt: true
      },
      references: {
        model: AccessGroup,
        key: 'id'
      }
    }
    notificationTypeId = {
      type: INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        isInt: true
      },
      references: {
        model: NotificationType,
        key: 'id'
      }
    }
    statusId = {
      type: INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        isInt: true
      },
      references: {
        model: Status,
        key: 'id'
      }
    }*/
  function User() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, User);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = User.__proto__ || Object.getPrototypeOf(User)).call.apply(_ref, [this].concat(args))), _this), _this.options = {
      timestamps: true,
      createdAt: false,
      updatedAt: true,
      paranoid: true,
      deletedAt: true,
      version: true
    }, _this.id = {
      type: (0, _sequelize.INTEGER)(),
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
      validate: {
        isInt: true,
        notNull: false
      }
    }, _this.first = {
      type: (0, _sequelize.STRING)(32),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    }, _this.last = {
      type: (0, _sequelize.STRING)(32),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    }, _this.phone = {
      type: (0, _sequelize.INTEGER)(10),
      allowNull: false,
      validate: {
        isInt: true,
        notNull: true
      }
    }, _this.email = {
      type: (0, _sequelize.STRING)(64),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notNull: true,
        notEmpty: true
      }
    }, _this.username = {
      type: (0, _sequelize.STRING)(64),
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true
      }
    }, _this.password = {
      type: (0, _sequelize.STRING)(64),
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true,
        isAlphanumeric: true,
        isLowercase: true
      }
    }, _this.key = {
      type: (0, _sequelize.STRING)(32),
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true,
        isAlphanumeric: true,
        isUppercase: true
      }
    }, _this.salt = {
      type: (0, _sequelize.STRING)(64),
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true,
        isAlphanumeric: true,
        isLowercase: true
      }
    }, _this.qrData = {
      type: _sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true
      }
    }, _this.lastAttempt = {
      type: _sequelize.INTEGER,
      allowNull: true,
      validate: {
        notNull: true,
        isInt: true
      }
    }, _this.failedAttempts = {
      type: (0, _sequelize.INTEGER)(2),
      allowNull: true,
      validate: {
        notNull: true,
        isInt: true
      }
    }, _this.accountResetPassphraseOne = { //could allow unlock/reset passphrases if users forget passwords, they can unlock their own account. (aka hash answers to 'secret' questions)
      type: (0, _sequelize.STRING)(64),
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true,
        isAlphanumeric: true,
        isLowercase: true
      }
    }, _this.accountResetPassphraseTwo = { //could allow unlock/reset passphrases if users forget passwords, they can unlock their own account. (aka hash answers to 'secret' questions)
      type: (0, _sequelize.STRING)(64),
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true,
        isAlphanumeric: true,
        isLowercase: true
      }
    }, _this.passwordReset = { //could epochTime.sessionId: ie 1504918297137.342 where session.userId and this.sessionId match to prevent excessive notifications. epochTime is when the password will expire. upon session creation, will calculate if notification should be sent using the setting [notify user password will expire in X days]
      type: _sequelize.FLOAT,
      allowNull: false,
      validate: {
        notNull: true,
        isFloat: true
      } }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return User;
}(_sequelizeClasses.Model);

exports.default = User;