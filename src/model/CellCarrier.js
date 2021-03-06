import { Model } from 'sequelize-classes';
import Sequelize from 'sequelize';

export default class CellCarrier extends Model {
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
    unique: true,
    validate: {
      notEmpty: true
    }
  }
  domain = {
    type: Sequelize.STRING(32),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  }
}