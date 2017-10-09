import Logger from '../common/Logger'
import DatasourceService from '../common/DatasourceService'
import { Database , User, Option, Role, CellCarrier, NotificationType, Status, AccessGroupRule, AccessGroup, Route } from '../../db/DatabaseConnector'

let speakeasy = require('speakeasy')
let sha256 = require('sha256')

export default class DatabaseService extends DatasourceService {

  static build = function(adminUser){
    let salt = speakeasy.generateSecret().hex
    return Database.sync({ force: true, match: /_dev$/ })
    .then(() => Logger.info(`creating database`))
    .then(() => User.create({
      first: adminUser.first.value,
      last : adminUser.last.value,
      phone: adminUser.phone.value,
      email: adminUser.email.value,
      username: adminUser.username.value,
      password: sha256(salt + adminUser.password.value),
      salt: salt,
      key: null,
      qrData: null,
      lastAttempt: null,
      failedAttempts: null,
      accountResetPassphraseOne: null,
      accountResetPassphraseTwo: null,
      passwordReset: null,
      Role: {name: 'Admin'},
      CellCarrier: {name: 'None', domain: 'example.com'},
      AccessGroup: {name: 'Default'},
      NotificationType: {name: 'None'},
      Status: {name: 'Incomplete'}
    }, {include: [ Role, CellCarrier, NotificationType, Status, AccessGroup ]}))
    .then(() => Option.bulkCreate([
      {key: 'Force email as username', value: 'false'},
      {key: 'Enable "Account Signup"', value: 'false'},
      {key: 'Enable "Update Profile"', value: 'false'},
      {key: 'Default session timeout (ms)', value: '36000'},
      {key: 'Notify admins when accounts lock', value: 'false'},
      {key: 'Notify user when account locks', value: 'false'},
      {key: 'Password expiration minimum policy (days)', value: '90'},
      {key: 'Password expiration maximum policy (days)', value: '90'},
      {key: 'Password expiration soft notification (days)', value: '90'},
      {key: 'Password expiration hard notification (days)', value: '90'},
      {key: 'Account lock policy (attempts)', value: '99'},
      {key: 'Java Mail Options', value: 'Not Configured'}
    ]))
    .then(() => Status.bulkCreate([
      {name: 'Complete'},
      {name: 'Locked'},
      {name: 'Revoked'}
    ]))
    .then(() => Role.bulkCreate([
      {name: 'User'}
    ]))
    .then(() => NotificationType.bulkCreate([
      {name: 'Email'},
      {name: 'Phone'}
    ]))
    .then(() => Route.create({name: 'Default', path: '/', destination: 'http://localhost:9000/', authenticated: false}))
    .then(() => AccessGroupRule.create({AccessGroupId: 1, RouteId: 1}))
    .then(() => Logger.info(`database created`))
  }

}