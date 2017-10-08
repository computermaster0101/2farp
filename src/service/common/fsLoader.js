import fs from 'fs'
import Logger from './Logger'
import { OptionsFile } from './OptionsFile'

export default class fsReader {

  static read = function(){
    return new Promise((resolve,reject) => {
      Logger.info(`read options from ${OptionsFile}`)

      fs.readFile(`${OptionsFile}`, 'utf8', (err, data) => {
        (data) ? Logger.debug(`data: ${data}`) : Logger.debug(`err: ${err}`)
        let options = (err) ? { application: { api: { port: [] }, gui: { port: [] } }, datasource: {} } :
                      JSON.parse(data.toString()) || { application: { api: { port: [] }, gui: { port: [] } }, datasource: {} }

        Logger.debug(`options: ${JSON.stringify(options)}`)
        resolve(options)
      })
    })
  }

}

