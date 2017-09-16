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

const options = { //fixme: these settings are straight up dev settings. IDC that i committed it because this will not exist later
  database: "2farp_dev",
  username: "root",
  pass: "toor",
  config: {
    host: "localhost",
    port: 3306,
    logging: false,
    dialect: "mysql"
  }
}

const databaseConnector = new Builder(options, [AccessGroup, AccessGroupRule, CellCarrier, NotificationType, Option, Role, Route, Status, User]);

exports.Database = databaseConnector.base
exports.AccessGroup = databaseConnector.AccessGroup
exports.AccessGroupRule = databaseConnector.AccessGroupRule
exports.CellCarrier = databaseConnector.CellCarrier
exports.NotificationType = databaseConnector.NotificationType
exports.Option = databaseConnector.Option
exports.Role = databaseConnector.Role
exports.Route = databaseConnector.Route
exports.Status = databaseConnector.Status
exports.User = databaseConnector.User