import { Model } from 'sequelize-classes';
import Sequelize from 'sequelize';

export default class NotificationType extends Model {
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
}