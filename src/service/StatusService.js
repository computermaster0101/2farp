import { Status } from '../db/DatabaseConnector'

export default class StatusService {
  static addDefaults = function(){
    return Status.bulkCreate([
      {name: 'Incomplete'},
      {name: 'Complete'},
      {name: 'Locked'},
      {name: 'Revoked'}])
  }
}