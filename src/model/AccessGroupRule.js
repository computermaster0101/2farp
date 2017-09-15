import { Model, paranoid, option, belongsTo } from 'sequelize-classes';
import Sequelize from 'sequelize';

import AccessGroup from './AccessGroup'
import Route from './Route'

@paranoid(true)
@option('timestamps', true)
@option('version', true)

@belongsTo('Route')
@belongsTo('AccessGroup')

export default class AccessGroupRule extends Model {
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