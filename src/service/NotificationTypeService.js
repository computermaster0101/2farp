import { NotificationType } from '../db/DatabaseConnector'

export default class NotificationTypeService {
  static addDefaults = function(){
    return NotificationType.bulkCreate([
      {name: 'email'},
      {name: 'phone'}])
  }
}