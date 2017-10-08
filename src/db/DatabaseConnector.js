import {Builder} from 'sequelize-classes'
import Logger from '../service/common/Logger'
import AccessGroup from '../model/AccessGroup'
import AccessGroupRule from '../model/AccessGroupRule'
import CellCarrier from '../model/CellCarrier'
import NotificationType from '../model/NotificationType'
import Option from '../model/Option'
import Role from '../model/Role'
import Route from '../model/Route'
import Status from '../model/Status'
import User from '../model/User'

exports.Database
exports.AccessGroup
exports.AccessGroupRule
exports.CellCarrier
exports.NotificationType
exports.Option
exports.Role
exports.Route
exports.Status
exports.User

exports.DatabaseConnector = function(datasourceOptions){
  return new Promise((resolve,reject) => {
    Logger.info(`building database connection`)

    const options = {
      database: datasourceOptions.database.value,
      username: datasourceOptions.user.value,
      pass: datasourceOptions.pass.value,
      config: {
        host: datasourceOptions.host.value,
        port: datasourceOptions.port.value,
        logging: false,
        dialect: datasourceOptions.dialect.value
      }
    }

    const databaseConnector = new Builder(options, [AccessGroup, AccessGroupRule, CellCarrier, NotificationType, Option, Role, Route, Status, User]);

    module.exports.Database = databaseConnector.base
    module.exports.AccessGroup = databaseConnector.AccessGroup
    module.exports.AccessGroupRule = databaseConnector.AccessGroupRule
    module.exports.CellCarrier = databaseConnector.CellCarrier
    module.exports.NotificationType = databaseConnector.NotificationType
    module.exports.Option = databaseConnector.Option
    module.exports.Role = databaseConnector.Role
    module.exports.Route = databaseConnector.Route
    module.exports.Status = databaseConnector.Status
    module.exports.User = databaseConnector.User
    resolve()
  })
}
