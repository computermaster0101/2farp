import { DatabaseConnector, Database } from '../db/DatabaseConnector'
import OptionService from '../service/OptionService'
import StatusService from '../service/StatusService'
import RoleService from '../service/RoleService'
import NotificationTypeService from '../service/NotificationTypeService'
import AccessGroupService from '../service/AccessGroupService'
import RouteService from '../service/RouteService'
import CellCarrierService from '../service/CellCarrierService'
import AccessGroupRuleService from '../service/AccessGroupRuleService'
import UserService from '../service/UserService'
import ValidationService from '../service/ValidationService'

export default class Main {

  static databaseBuilder = function(){
    console.log(`databaseBuilder started`)
    return Database.sync({ force: true, match: /_dev$/ })
    .then(() => console.log(`creating database`))
    .then(() => OptionService.addDefaults())
    .then(() => StatusService.addDefaults())
    .then(() => RoleService.addDefaults())
    .then(() => NotificationTypeService.addDefaults())
    .then(() => AccessGroupService.addDefaults())
    .then(() => RouteService.addDefaults())
    .then(() => CellCarrierService.addDefaults())
    .then(() => AccessGroupRuleService.addDefaults(1,1))
    .then(() => UserService.addDefault())
    .then(() => console.log(`database created`))
    .catch((e) => {
      console.log(`${e}`)
    })
  }
}

