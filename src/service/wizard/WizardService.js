import Logger from '../common/Logger'
import DatabaseService from './DatabaseService'

export default class WizardService {

  static testDatabase = DatabaseService.test

  static buildDatabase = DatabaseService.build

}

/*
  static buildDatabase = function(adminUserDefaults){
    log.debug(adminUserDefaults)
    return Database.sync({ force: true, match: /_dev$/ })
    .then(() => log.info(`creating database`))
    .then(() => User.create({
      first: adminUserDefaults.first,
      last : adminUserDefaults.last,
      phone: adminUserDefaults.phone,
      email: adminUserDefaults.email,
      username: adminUserDefaults.username,
      password: adminUserDefaults.password,
      key: 'OJ3TS4BTIY7TA4LTGF3FW5SCMY7V2P3J',
      salt: 'f75c002cda45152e3c31721acd0372527aeaf94fcf0fdee05466e3f91c7c1129',
      qrData: adminUserDefaults.otpAuthUrl,
      lastAttempt: null,
      failedAttempts: null,
      accountResetPassphraseOne: 'f75c002cda45152e3c31721acd0372527aeaf94fcf0fdee05466e3f91c7c1129',
      accountResetPassphraseTwo: 'f75c002cda45152e3c31721acd0372527aeaf94fcf0fdee05466e3f91c7c1129',
      passwordReset: '123456789.123',
      Role: {name: 'admin'},
      CellCarrier: {name: 'Verizon', domain: 'vzwpix.com'},
      AccessGroup: {name: 'Default'},
      NotificationType: {name: 'email'},
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
      {name: 'user'}
    ]))
    .then(() => NotificationType.bulkCreate([
      {name: 'phone'}
    ]))
    .then(() => Route.create({name: 'Default', path: '/', destination: 'http://localhost:9000/', authenticated: false}))
    .then(() => AccessGroupRule.create({AccessGroupId: 1, RouteId: 1}))
    .then(() => log.info(`database created`))
  }*/