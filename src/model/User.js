import { Model, paranoid, option, belongsTo } from 'sequelize-classes'
import Sequelize from 'sequelize'

import Role from './Role'
import CellCarrier from './CellCarrier'
import AccessGroup from './AccessGroup'
import NotificationType from './NotificationType'
import Status from './Status'

@paranoid(true)
@option('timestamps', true)
@option('createdAt', false)
@option('version', true)

@belongsTo('Role')
@belongsTo('CellCarrier')
@belongsTo('AccessGroup')
@belongsTo('NotificationType')
@belongsTo('Status')

export default class User extends Model {
  id = {
    type: Sequelize.INTEGER(),
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    validate: {
      isInt: true
    }
  }
  first = {
    type: Sequelize.STRING(32),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
  last = {
    type: Sequelize.STRING(32),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
  phone = {
    type: Sequelize.INTEGER(10),
    allowNull: false,
    validate: {
      isInt: true
    }
  }
  email = {
    type: Sequelize.STRING(64),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  }
  username = {
    type: Sequelize.STRING(64),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  }
  password = {
    type: Sequelize.STRING(64),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isAlphanumeric: true,
      isLowercase: true
    }
  }
  key = {
    type: Sequelize.STRING(32),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isAlphanumeric: true,
      isUppercase: true
    }
  }
  salt = {
    type: Sequelize.STRING(64),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isAlphanumeric: true,
      isLowercase: true
    }
  }
  qrData = {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  }
  lastAttempt = {
    type: Sequelize.INTEGER,
    allowNull: true,
    validate: {
      isInt: true
    }
  }
  failedAttempts = {
    type: Sequelize.INTEGER(2),
    allowNull: true,
    validate: {
      isInt: true
    }
  }
  accountResetPassphraseOne = { //could allow unlock/reset passphrases if users forget passwords, they can unlock their own account. (aka hash answers to 'secret' questions)
    type: Sequelize.STRING(64),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isAlphanumeric: true,
      isLowercase: true
    }
  }
  accountResetPassphraseTwo = { //could allow unlock/reset passphrases if users forget passwords, they can unlock their own account. (aka hash answers to 'secret' questions)
    type: Sequelize.STRING(64),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isAlphanumeric: true,
      isLowercase: true
    }
  }
  passwordReset = { //could epochTime.sessionId: ie 1504918297137.342 where session.userId and this.sessionId match to prevent excessive notifications. epochTime is when the password will expire. upon session creation, will calculate if notification should be sent using the setting [notify user password will expire in X days]
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      isFloat: true
    }
  }
  createdBy = {
    type: Sequelize.STRING,
    defaultValue: 'System',
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
  updatedBy = {
    type: Sequelize.STRING,
    defaultValue: 'System',
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
}