import { Role } from '../db/DatabaseConnector'

export default class RoleService {
  static addDefaults = function(){
    return Role.bulkCreate([
      {name: 'admin'},
      {name: 'user'}])
  }
}