import { Model, paranoid, option } from 'sequelize-classes';
import Sequelize from 'sequelize';

@paranoid(true)
@option('timestamps', true)
@option('version', true)

export default class AccessGroup extends Model {
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
  name = {
    type: Sequelize.STRING(32),
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
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