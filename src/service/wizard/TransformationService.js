import fsReader from '../common/fsLoader'
import Logger from '../common/Logger'
import OptionsValidator from '../common/OptionsValidator'

export default class Transformer {

  static transformFromWizard = function(fromWizard){
    Logger.info(`transforming fromWizard`)

    return new Promise((resolve,reject) => {
      fsReader.read()
      .then((options) => OptionsValidator.validate(options))
      .then((fromFile) => {
        Logger.debug(`fromWizard: ${JSON.stringify(fromWizard)}`)
        Logger.debug(`fromFile: ${JSON.stringify(fromFile)}`)

        let transformed = {
          application: {
            apiPort: parseInt(fromWizard.apiPort) || fromWizard.apiPort,
            guiPort: parseInt(fromWizard.guiPort) || fromWizard.guiPort,
            multithreaded: (fromWizard.multithreaded === "true") ? true : false
          },
          datasource: {
            database: fromWizard.database,
            host: fromWizard.host,
            port: parseInt(fromWizard.port) || fromWizard.port,
            user: fromWizard.user,
            pass: (fromWizard.pass != '********') ? fromWizard.pass : fromFile.datasource.pass.value,
            dialect: fromWizard.dialect
          }
        }

        Logger.debug(`transformed: ${JSON.stringify(transformed)}`)
        resolve(transformed)
      })
    })
  }

}