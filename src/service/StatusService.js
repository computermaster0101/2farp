import { Status } from '../db/DatabaseConnector'

export default class StatusService {
  static addDefaults = function(){
    return Status.bulkCreate([
      {name: 'incomplete'},
      {name: 'complete'},
      {name: 'locked'},
      {name: 'revoked'}])
  }
}