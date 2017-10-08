import fs from 'fs'
import Logger from '../common/Logger'
import fsReader from '../common/fsLoader'
import { OptionsFile } from '../common/OptionsFile'

export default class fsHelper extends fsReader {

  static write = function(options){
    return new Promise((resolve,reject) => {
      Logger.info(`write options to ${OptionsFile}`)

      fs.writeFileSync(`${OptionsFile}`, JSON.stringify(options), 'utf8')

      Logger.debug(`options: ${JSON.stringify(options)}`)
      resolve()
    })
  }

}