import fs from 'fs'
import express from 'express'
import Logger from 'bunyan-log'
import { DatabaseConnector, Database } from '../db/DatabaseConnector'
import WizardAPI from '../routes/wizard/api'
import WizardGUI from '../routes/wizard/gui'
import MainAPI from '../routes/main/api'
import MainGUI from '../routes/main/gui'

const optionsFile = './options.json'
const log = new Logger({name:'bootstrapper', useStdOut: true, isNewProcess: true})

export default class Bootstrapper { //fixme: if options.json is created manually, defaults wont be in the database. I dont know if this is REALLY an issue

  static startup = function() { //todo: requires code review
    const api = express()
    const gui = express()
    this.readOptionsFile()
    .then((fromFile) => this.checkOptions(fromFile))
    .then((options) => {
      log.info(options)
      DatabaseConnector(options)
      .then(() => Database.authenticate())
      .then(() => {
        log.info('connected to database with loaded settings')
        options.firstRun = false
      })
      .catch((e) => {
        log.info('could not connect to database with loaded settings')
        options.firstRun = true
      })
      .then(() => {
        if(options.firstRun === false){
          log.info(`loading main api`)
          api.use(MainAPI)
          log.info(`loading main gui`)
          gui.use(MainGUI)
        }else{
          log.info(`loading first run api`)
          api.use(WizardAPI)
          log.info(`loading first run gui`)
          gui.use(WizardGUI)
        }
        log.info(`starting API`)
        api.listen(options.apiPort, () => {
          log.info(`API listening on port ${options.apiPort}`)
        })
        log.info(`starting GUI`)
        gui.listen(options.guiPort, () => {
          log.info(`GUI listening on port ${options.guiPort}`)
        })
      })
    })
  }

  static readOptionsFile = function(){ //todo: requires code review
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

  static checkOptions = function(properties){ //todo: add additional validation. Only api and gui ports are needed. If db connection fails firstRun = true
    return new Promise((resolve,reject) => {
      resolve({
        apiPort: properties.apiPort || '8000',
        guiPort: properties.guiPort || '9000',
        database: properties.database,
        host: properties.host,
        port: properties.port,
        username: properties.username,
        pass: properties.pass,
        dialect: properties.dialect
      })
    })
  }


}