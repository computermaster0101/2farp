import fs from 'fs'
import Logger from 'bunyan-log'
import { DatabaseConnector, Database, Option, User, Role, Route, AccessGroupRule, CellCarrier, AccessGroup, NotificationType, Status } from '../db/DatabaseConnector'

import qrcode from 'qrcode'

const speakeasy = require('speakeasy')
const log = new Logger({name:'application', useStdOut: true, isNewProcess: true})
const optionsFile = './options.json'

export default class Application {

  static loadOptions = function(){
    let adminUserDefaults
    let datasourceOptions
    return new Promise((resolve,reject) => {
      this.readOptionsFile()
      .then((fromFile) => this.validateDatasourceOptions(fromFile))
      .then((validDatasourceOptions) => {
        log.debug(validDatasourceOptions)
        datasourceOptions=validDatasourceOptions
      })
      .then(() => this.validateAdminUserDefaults({}))
      .then((validDefaults) => {
        log.debug(validDefaults)
        adminUserDefaults=validDefaults
      })
      .then(() => {
        log.debug(datasourceOptions)
        log.debug(adminUserDefaults)
        resolve({datasourceOptions:datasourceOptions,adminUserDefaults:adminUserDefaults})
      })
    })
  }

  static testOptions = function(fromWizard){
    return new Promise((resolve,reject) => {
      let adminUserDefaults
      let datasourceOptions
      this.validateDatasourceOptions(fromWizard)
      .then((validDatasourceOptions) => {
        datasourceOptions=validDatasourceOptions
      })
      .then(() => this.validateAdminUserDefaults(fromWizard))
      .then((validDefaults) => {
        log.debug(validDefaults)
        adminUserDefaults=validDefaults
      })
      .then(() => DatabaseConnector(datasourceOptions))
      .then(() => Database.authenticate())
      .then(() => this.WriteOptionsFile(datasourceOptions))
      .then(() => this.buildDatabase(adminUserDefaults))
      .then(() => {
        log.debug(datasourceOptions)
        log.debug(adminUserDefaults)
        resolve({datasourceOptions: datasourceOptions, adminUserDefaults:adminUserDefaults, status: 'Database connection successfully tested\nDatabase has been successfully created'})
      })
      .catch((e) => {
        log.debug(datasourceOptions)
        log.debug(adminUserDefaults)
        resolve({datasourceOptions: datasourceOptions, adminUserDefaults:adminUserDefaults, status: e})
      })
    })
  }

  static restart = function(baseUrl){
    return new Promise((resolve,reject) => {
      this.readOptionsFile()
      .then((fromFile) => this.validateDatasourceOptions(fromFile))
      .then((validDatasourceOptions) => {
        setTimeout(function(){
          process.exit(0)
        },1000 * 5)
        log.info(validDatasourceOptions)
        resolve({redirectURL: `${baseUrl.protocol}:\/\/${baseUrl.hostname}:${validDatasourceOptions.guiPort}\/`})

      })

    })
  }

  static readOptionsFile = function(){
    return new Promise((resolve,reject) => {
      log.info(`reading options from ${optionsFile}`)
      let options
      fs.readFile(`${optionsFile}`, 'utf8', (err, data) => {
        if (err) {
          log.info(`${err}`)
          options = {}
        } else {
          options = JSON.parse(data.toString()) || {}
        }
        log.debug(`Bootstrapper.readOptionsFile.options: ${JSON.stringify(options)}`)
        resolve(options)
      })
    })
  }

  static WriteOptionsFile = function(options){
    return new Promise((resolve,reject) => {
      log.debug(`writing database info to ${optionsFile}`)
      fs.writeFileSync(`${optionsFile}`, JSON.stringify(options), 'utf8')
      resolve()
    })
  }

  static validateDatasourceOptions = function(properties){ //fixme: add additional validation. Only api and gui ports are needed. If db connection fails firstRun = true
    return new Promise((resolve,reject) => {
      resolve({
        database: properties.database || '2farp',
        username: properties.username || 'root',
        pass: properties.pass || 'toor',
        host: properties.host || 'localhost',
        port: properties.port || '3306',
        dialect: properties.dialect || 'mysql',
        apiPort: properties.apiPort || '8000',
        guiPort: properties.guiPort || '9000'
      })
    })
  }

  static validateAdminUserDefaults = function(defaults){
    log.debug(defaults)
    return new Promise((resolve,reject) => {
      let secret = defaults.secret || speakeasy.generateSecret()
      let optAuthUrl = defaults.otpAuthUrl || secret.otpauth_url
      let qrCode
      qrcode.toDataURL(optAuthUrl, function(err,data){
        qrCode=data
        resolve({
          otpAuthUrl: optAuthUrl,
          qrCode: qrCode,
          first: defaults.first || 'admin',
          last : defaults.last || 'istrator',
          phone: defaults.phone || '1234567890',
          email: defaults.email || 'admin@example.com',
          username: defaults.adminUser || 'admin',
          password: defaults.adminPass
        })
      })
    })
  }

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
  }

}

