import { AccessGroup } from '../db/DatabaseConnector'

export default class AccessGroupService {
  static addDefaults = function(){
    return AccessGroup.create({name: 'Default'})
  }
}