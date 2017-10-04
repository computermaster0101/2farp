import Logger from '../common/Logger'
import fsReader from '../common/fsReader'
import { OptionsFile } from '../common/OptionsFile'
import fs from 'fs'

export default class fsHelper extends fsReader {

  static writeOptionsFile = function(options){
    return new Promise((resolve,reject) => {
      Logger.info(`write options from file ${OptionsFile}`)
      Logger.debug(`write options ${JSON.stringify(options)}`)

      fs.writeFileSync(`${OptionsFile}`, JSON.stringify(options), 'utf8')
      resolve()
    })
  }

}