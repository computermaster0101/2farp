import fs from 'fs'
import Logger from 'bunyan-log'

import { DatabaseConnector, Database } from '../db/DatabaseConnector'

const log = new Logger({name:'application', useStdOut: true, isNewProcess: true})
const optionsFile = './options.json'

export default class Application {

  static loadOptions = function(){
    return this.readOptionsFile()
    .then((fromFile) => this.validateDatasourceOptions(fromFile))
  }

  static testOptions = function(fromWizard){
    return new Promise((resolve,reject) => {
      let datasourceOptions
      this.validateDatasourceOptions(fromWizard)
      .then((validDatasourceOptions) => {
        datasourceOptions = validDatasourceOptions
      })
      .then(() => DatabaseConnector(datasourceOptions))
      .then(() => Database.authenticate())
      .then(() => this.WriteOptionsFile(datasourceOptions))
      .then(() => {
        resolve({properties: datasourceOptions, status: 'Database connection successfully tested'})
      })
      .catch((e) => {
        resolve({properties: datasourceOptions, status: e})
      })
    })
  }

  static restart = function(){
    return new Promise((resolve,reject) => {
      setTimeout(function(){
        process.exit(0)
      },1000 * 5)
      resolve({redirectURL: 'http://localhost:8081'})
    })
  }

  static readOptionsFile = function(){
    return new Promise((resolve,reject) => {
      log.info(`reading options from ${optionsFile}`)
      let options
      fs.readFile(`${optionsFile}`, 'utf8', (err, data) => {
        if (err) {
          log.info(`${err}`)
          options = {}
        } else {
          options = JSON.parse(data.toString()) || {}
        }
        log.debug(`Bootstrapper.readOptionsFile.options: ${JSON.stringify(options)}`)
        resolve(options)
      })
    })
  }

  static WriteOptionsFile = function(options){
    return new Promise((resolve,reject) => {
      log.info(`writing database info to ${optionsFile}`)
      fs.writeFileSync(`${optionsFile}`, JSON.stringify(options), 'utf8')
      resolve()
    })
  }

  static validateDatasourceOptions = function(properties){ //fixme: add additional validation. Only api and gui ports are needed. If db connection fails firstRun = true
    return new Promise((resolve,reject) => {
      resolve({
        database: properties.database || '2farp',
        username: properties.username || 'root',
        pass: properties.pass || 'toor',
        host: properties.host || 'localhost',
        port: properties.port || '3306',
        dialect: properties.dialect || 'mysql',
        apiPort: properties.apiPort || '8080',
        guiPort: properties.guiPort || '8081'
      })
    })
  }

}

