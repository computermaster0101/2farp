import fs from 'fs'
import child_process from 'child_process'
import Bootstrapper from './bootstrapper'

import { DatabaseConnector, Database } from '../db/DatabaseConnector'

let datasourceFile = './datasource.json'

export default class Application extends Bootstrapper{

  static saveProperties = function(datasourceProperties){
    return new Promise((resolve,reject) => {
      this.validateProperties(datasourceProperties)
      .then((validProperties) => DatabaseConnector(validProperties))
      .then(() => Database.authenticate())
      .then(() => {
        datasourceProperties.firstRun = 'false'
        console.log(`writing database info to file ${datasourceFile}`)
        fs.writeFileSync(`${datasourceFile}`, JSON.stringify(datasourceProperties), 'utf8')
        resolve('Connection Verified')
      })
      .catch((e) => {resolve(e)})
    })
  }

  static respawn = function(){
    console.log(`${process.argv}`)
    child_process.spawn(process.argv[0], [process.argv[1]], {
      stdio: 'inherit',
      detached: true
    }).unref();
    process.exit(0)
  }

  static shutdown = function(){
    process.exit(0)
  }

}

