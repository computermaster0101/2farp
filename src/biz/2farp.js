import { Database } from '../db/DatabaseConnector'
import OptionService from '../service/OptionService'
import StatusService from '../service/StatusService'
import RoleService from '../service/RoleService'
import NotificationTypeService from '../service/NotificationTypeService'
import AccessGroupService from '../service/AccessGroupService'
import RouteService from '../service/RouteService'
import CellCarrierService from '../service/CellCarrierService'
import AccessGroupRuleService from '../service/AccessGroupRuleService'
import UserService from '../service/UserService'

let Utilities = require('./Utilities')

export default class TwoFactorAuthenticationReverseProxy {

  static firstRun = function(databaseOptions){
    Utilities.writeDatasource(databaseOptions)
    console.log(`first run complete`)
  }

  static databaseBuilder = function(){
    console.log(`databaseBuilder started`)
    let databaseOptions = Utilities.readDatasource()

    Database.authenticate()
    .then(() => console.log(`Beginning database sync`))
/*    .then(() => Database.sync({ force: true, match: /_dev$/ }))
    .then(() => console.log(`Creating Database`))
    .then(() => OptionService.addDefaults())
    .then(() => StatusService.addDefaults())
    .then(() => RoleService.addDefaults())
    .then(() => NotificationTypeService.addDefaults())
    .then(() => AccessGroupService.addDefaults())
    .then(() => RouteService.addDefaults())
    .then(() => CellCarrierService.addDefaults())
    .then(() => console.log(`Database Created`))
  */ //todo: this is working already. Remove this comment once reading the db options file is done
  }
}
