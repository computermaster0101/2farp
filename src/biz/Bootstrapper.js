import Logger from '../service/common/Logger'
import Datasource from '../service/common/DatasourceService'
import WizardAPI from '../routes/wizard/api'
import WizardGUI from '../routes/wizard/gui'
import MainAPI from '../routes/main/api'
import MainGUI from '../routes/main/gui'
import express from 'express'

export default class Bootstrapper {

  static startup = function(options) {
    Logger.info(`testing datasource connection`)

    const api = express()
    const gui = express()

    Datasource.test(options.datasource)
    .then(() => {
      Logger.info(`connected to datasource`)
      Logger.info(`not using first run wizard`)
      options.firstRun = false
    })
    .catch((e) => {
      Logger.warn(`could not connect to datasource`)
      Logger.warn(`using first run wizard`)
      options.firstRun = true
    })
    .then(() => {
      options.firstRun ? ( api.use(WizardAPI) && gui.use(WizardGUI) ) : ( api.use(MainAPI) && gui.use(MainGUI) )
       Logger.info(`starting API`)
      api.listen(options.application.apiPort.value, () => {
        Logger.info(`API listening on port ${options.application.apiPort.value}`)
      })
      Logger.info(`starting GUI`)
      gui.listen(options.application.guiPort.value, () => {
        Logger.info(`GUI listening on port ${options.application.guiPort.value}`)
      })
    })
  }

}
