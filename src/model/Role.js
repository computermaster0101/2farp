import { Model, paranoid, option } from 'sequelize-classes';
import Sequelize from 'sequelize';

@paranoid(true)
@option('timestamps', true)
@option('createdAt', false)
@option('version', true)

export default class Role extends Model {
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