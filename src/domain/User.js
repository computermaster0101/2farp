import {Model} from 'sequelize-classes';
import {FLOAT} from 'sequelize';
import {STRING} from 'sequelize';
import {INTEGER} from 'sequelize';


export default class User extends Model {

  options = {
    timestamps: true,
    createdAt: false,
    updatedAt: true,
    paranoid: true,
    deletedAt: true,
    version: true
  }

  id = {
    type: INTEGER(),
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    validate: {
      isInt: true,
      notNull: false
    }
  }
  first = {
    type: STRING(32),
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  }
  last = {
    type: STRING(32),
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  }
  phone = {
    type: INTEGER(10),
    allowNull: false,
    validate: {
      isInt: true,
      notNull: true
    }
  }
  email = {
    type: STRING(64),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notNull: true,
      notEmpty: true
    }
  }
  username = {
    type: STRING(64),
    allowNull: false,
    unique: true,
    validate: {
      notNull: true,
      notEmpty: true
    }
  }
  password = {
    type: STRING(64),
    allowNull: false,
    unique: true,
    validate: {
      notNull: true,
      notEmpty: true,
      isAlphanumeric: true,
      isLowercase: true
    }
  }
  key = {
    type: STRING(32),
    allowNull: false,
    unique: true,
    validate: {
      notNull: true,
      notEmpty: true,
      isAlphanumeric: true,
      isUppercase: true
    }
  }
  salt = {
    type: STRING(64),
    allowNull: false,
    unique: true,
    validate: {
      notNull: true,
      notEmpty: true,
      isAlphanumeric: true,
      isLowercase: true
    }
  }
  qrData = {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: true,
      notEmpty: true
    }
  }
  lastAttempt = {
    type: INTEGER,
    allowNull: true,
    validate: {
      notNull: true,
      isInt: true
    }
  }
  failedAttempts = {
    type: INTEGER(2),
    allowNull: true,
    validate: {
      notNull: true,
      isInt: true
    }
  }
  accountResetPassphraseOne = { //could allow unlock/reset passphrases if users forget passwords, they can unlock their own account. (aka hash answers to 'secret' questions)
    type: STRING(64),
    allowNull: false,
    unique: true,
    validate: {
      notNull: true,
      notEmpty: true,
      isAlphanumeric: true,
      isLowercase: true
    }
  }
  accountResetPassphraseTwo = { //could allow unlock/reset passphrases if users forget passwords, they can unlock their own account. (aka hash answers to 'secret' questions)
    type: STRING(64),
    allowNull: false,
    unique: true,
    validate: {
      notNull: true,
      notEmpty: true,
      isAlphanumeric: true,
      isLowercase: true
    }
  }
  passwordReset = { //could epochTime.sessionId: ie 1504918297137.342 where session.userId and this.sessionId match to prevent excessive notifications. epochTime is when the password will expire. upon session creation, will calculate if notification should be sent using the setting [notify user password will expire in X days]
    type: FLOAT,
    allowNull: false,
    validate: {
      notNull: true,
      isFloat: true
    }
  }
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
}