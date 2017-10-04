import Logger from '../service/common/Logger'
import fsReader from '../service/common/fsReader'
import OptionsValidator from '../service/common/OptionsValidator'
import { DatabaseConnector, Database } from '../db/DatabaseConnector'
import WizardAPI from '../routes/wizard/api'
import WizardGUI from '../routes/wizard/gui'
import MainAPI from '../routes/main/api'
import MainGUI from '../routes/main/gui'
import express from 'express'


export default class Bootstrapper {

  static startup = function() {
    Logger.info(`beginning application startup`)

    const api = express()
    const gui = express()

    fsReader.readOptionsFile()
    .then((fromFile) => OptionsValidator.validate(fromFile))
    .then((validOptions) => {
      Logger.info(`testing datasource connection`)
      DatabaseConnector(validOptions.datasource)
      .then(() => Database.authenticate())
      .then(() => {
        Logger.info(`connected to datasource using loaded options`)
        Logger.info(`not using first run wizard`)
        validOptions.firstRun = false
      })
      .catch((e) => {
        Logger.warn(`could not connect to datasource using loaded options`)
        Logger.warn(`using first run wizard`)
        validOptions.firstRun = true
      })
      .then(() => {
        validOptions.firstRun ? ( api.use(WizardAPI) && gui.use(WizardGUI) ) : ( api.use(MainAPI) && gui.use(MainGUI) )

        Logger.info(`starting API`)
        api.listen(validOptions.application.api.port[0], () => {
          Logger.info(`API listening on port ${validOptions.application.api.port[0]}`)
        })
        Logger.info(`starting GUI`)
        gui.listen(validOptions.application.gui.port[0], () => {
          Logger.info(`GUI listening on port ${validOptions.application.gui.port[0]}`)
        })
      })
    })
  }

}