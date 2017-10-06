import Logger from '../service/common/Logger'
import fsHelper from '../service/wizard/fsHelper'
import Validator from '../service/wizard/ValidationService'
import Transformer from '../service/wizard/TransformationService'
import { DatabaseConnector, Database } from '../db/DatabaseConnector'

export default class Application {

  static loadOptions = function(){
    return new Promise((resolve,reject) => {
      Logger.info(`loading options`)

      let adminUserOptions
      let datasourceOptions

      fsHelper.readOptionsFile()
      .then((fromFile) => Validator.validateDatasource(fromFile))
      .then((validOptions) => {
        datasourceOptions=validOptions
      })
      .then(() => Validator.validateAdmin({}))
      .then((validAdmin) => {
        adminUserOptions=validAdmin
      })
      .then(() => {
        adminUserOptions.password[0] = '********'
        datasourceOptions.datasource.pass[0] = '********'
        resolve({ options:datasourceOptions, adminUserOptions:adminUserOptions })
      })
    })
  }

  static testOptions = function(fromWizard){
    return new Promise((resolve,reject) => {
      Logger.info(`testing options fromWizard`)
      Logger.debug(`testing options ${JSON.stringify(fromWizard)}`)

      let adminUserOptions
      let datasourceOptions

      Transformer.transformDatasourceFromWizard(fromWizard)
      .then((formattedFromWizard) => Validator.validateDatasource(formattedFromWizard))
      .then((validOptions) => {
        datasourceOptions=validOptions
      })
      .then(() => Validator.validateAdmin(fromWizard))
      .then((validAdmin) => {
        adminUserOptions=validAdmin
      })
      .then(() => DatabaseConnector(datasourceOptions.datasource))
      .then(() => Database.authenticate())
      .then(() => Transformer.transformDatasourceFromWizard(fromWizard))
      .then((formattedFromWizard) => fsHelper.writeOptionsFile(formattedFromWizard))
      .then(() => {
        adminUserOptions.password[0] = '********'
        datasourceOptions.datasource.pass[0] = '********'
        resolve({options: datasourceOptions, adminUserOptions: adminUserOptions, status: 'Database connection successfully tested\nDatabase has been successfully created'})
      })
      .catch((e) => {
        resolve({adminUserOptions: adminUserOptions, options: datasourceOptions, status: e})
      })
    })
  }

  static restart = function(baseUrl){
    return new Promise((resolve,reject) => {
      Logger.info(`restart fromWizard`)

      fsHelper.readOptionsFile()
      .then((fromFile) => Validator.validateDatasource(fromFile))
      .then((validOptions) => {
        setTimeout(function(){
          process.exit(0)
        },1000 * 5)

        resolve({redirectURL: `${baseUrl.protocol}:\/\/${baseUrl.hostname}:${validOptions.application.gui.port[0]}\/`})
      })
    })
  }

}

