import fs from 'fs'
import FirstRunAPI from '../routes/firstRun/api'
import FirstRunGUI from '../routes/firstRun/gui'
import MainAPI from '../routes/main/api'
import MainGUI from '../routes/main/gui'

let datasourceFile = './datasource.json'
let apiDefaultPort = 8000
let guiDefaultPort = 9000;
let firstRun = true;

const express = require('express'); //https://www.npmjs.com/package/express
const api = express()
const gui = express()
let apiPort
let guiPort

export default class Bootstrapper {

  static getProperties = function(){
    return new Promise((resolve,reject) => {
      console.log(`reading database info from file ${datasourceFile}`)
      let options
      fs.readFile(`${datasourceFile}`, 'utf8', function(err, data) {
        if (err) {
          console.log(`${err}`)
          options = {firstRun: 'true'}
        } else {
          try {
            options = JSON.parse(data.toString())
            options.firstRun = 'false'
          } catch(e) {
            options = {firstRun: 'true'}
          }
        }
        console.log(`${JSON.stringify(options)}`)
        resolve(options)
      })
    })
  }

  static validateProperties = function(properties){
    return new Promise((resolve,reject) => {
      let validate = {
        firstRun: properties.firstRun,
        database: properties.database,
        username: properties.username,
        pass: properties.pass,
        host: properties.host,
        port: properties.port,
        logging: properties.logging,
        dialect: properties.dialect,
        apiPort: properties.apiPort,
        guiPort: properties.guiPort
      }
      console.log(`validated: ${JSON.stringify(validate)}`)
      resolve(validate)
    })
  }

  static startup = function(properties) {
    if(properties.firstRun === 'true'){
      console.log(`loading first run properties`)
      apiPort = apiDefaultPort
      guiPort = guiDefaultPort
      console.log(`loading first run api`)
      api.use(FirstRunAPI)
      console.log(`loading first run gui`)
      gui.use(FirstRunGUI)
    }else{
      console.log(`loading main application properties`)
      apiPort = properties.apiPort
      guiPort = properties.guiPort
      console.log(`loading main api`)
      api.use(MainAPI)
      console.log(`loading main gui`)
      gui.use(MainGUI)
    }
    console.log(`starting API`)

    api.listen(apiPort, function(){
      console.log(`API listening on port ${apiPort}`)
      console.log(`starting GUI`)
      gui.listen(guiPort, function(){
        console.log(`GUI listening on port ${guiPort}`)
      })
    })
  }

}