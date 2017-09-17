import {Builder} from 'sequelize-classes'
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

  const options = { //fixme: these settings are straight up dev settings. IDC that i committed it because this will not exist later
    database: datasourceOptions.database,
    username: datasourceOptions.username,
    pass: datasourceOptions.password,
    config: {
      host: datasourceOptions.host,
      port: datasourceOptions.port,
      logging: datasourceOptions.logging,
      dialect: datasourceOptions.dialect
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

}