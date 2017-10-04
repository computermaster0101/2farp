import Logger from './Logger'
import { OptionsFile } from './OptionsFile'
import fs from 'fs'

export default class fsReader {

  static readOptionsFile = function(){
    return new Promise((resolve,reject) => {
      Logger.info(`reading options from file ${OptionsFile}`)

      let options
      fs.readFile(`${OptionsFile}`, 'utf8', (err, data) => {
        (data) ? (options = JSON.parse(data.toString())) ||
                 (options = { application: { api: { port: [] }, gui: { port: [] } }, datasource: {} }) :
                 options = { application: { api: { port: [] }, gui: { port: [] } }, datasource: {} }

        Logger.debug(`read options ${JSON.stringify(options)}`)
        resolve(options)
      })
    })
  }

}

