import Logger from '../service/common/Logger'
import fsHelper from '../service/wizard/fsHelper'
import Validator from '../service/wizard/ValidationService'
import DatabaseService from '../service/wizard/DatabaseService'
import Transformer from '../service/wizard/TransformationService'

export default class Application {

  static loadOptions = function(){
    return new Promise((resolve,reject) => {
      Logger.info(`loading options`)

      let adminUserOptions
      let bootstrapOptions

      fsHelper.read()
      .then((fromFile) => Validator.validateOptions(fromFile))
      .then((validOptions) => {bootstrapOptions = validOptions})
      .then(() => Validator.validateAdmin({}))
      .then((validAdmin) => {adminUserOptions = validAdmin})
      .then(() => {

        Logger.debug(`adminUserOptions: ${JSON.stringify(adminUserOptions)}`)
        Logger.debug(`bootstrapOptions: ${JSON.stringify(bootstrapOptions)}`)

        adminUserOptions.password.value = '********'
        bootstrapOptions.datasource.pass.value = '********'
        resolve({ options:bootstrapOptions, adminUserOptions:adminUserOptions })
      })
    })
  }

  static testOptions = function(fromWizard){
    return new Promise((resolve,reject) => {
      Logger.info(`testing options fromWizard`)
      Logger.debug(`fromWizard: ${JSON.stringify(fromWizard)}`)

      let adminUserOptions
      let bootstrapOptions
      let formattedFromWizard

      Transformer.transformFromWizard(fromWizard)
      .then((transformedData) => {formattedFromWizard = transformedData})
      .then(() => Validator.validateOptions(formattedFromWizard))
      .then((validOptions) => {bootstrapOptions = validOptions})
      .then(() => Validator.validateAdmin(fromWizard))
      .then((validAdmin) => {adminUserOptions = validAdmin})
      .then(() => DatabaseService.test(bootstrapOptions.datasource))
      .then(() => DatabaseService.build(adminUserOptions))
      .then(() => fsHelper.write(formattedFromWizard))
      .then(() => {

        Logger.debug(`adminUserOptions: ${JSON.stringify(adminUserOptions)}`)
        Logger.debug(`bootstrapOptions: ${JSON.stringify(bootstrapOptions)}`)

        adminUserOptions.password.value = '********'
        bootstrapOptions.datasource.pass.value = '********'
        resolve({ status: 'Database connection successfully tested\nDatabase has been successfully created', options:bootstrapOptions, adminUserOptions:adminUserOptions })

      })
      .catch((e) => {
        adminUserOptions.password.value = '********'
        bootstrapOptions.datasource.pass.value = '********'
        resolve({ adminUserOptions: adminUserOptions, options: bootstrapOptions, status: e })
      })
    })
  }

  static restart = function(baseUrl){
    return new Promise((resolve,reject) => {
      Logger.info(`restart fromWizard`)

      fsHelper.read()
      .then((fromFile) => Validator.validateOptions(fromFile))
      .then((validOptions) => {
        setTimeout(function(){
          Logger.info(`terminate thread now`)
          process.exit(0)
        },1000 * 5)

        resolve({redirectURL: `${baseUrl.protocol}:\/\/${baseUrl.hostname}:${validOptions.application.guiPort.value}\/`})
      })
    })
  }

}

