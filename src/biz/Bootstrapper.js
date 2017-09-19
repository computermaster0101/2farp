import fs from 'fs'

let datasourceFile = './datasource.json'

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
      console.log(`${JSON.stringify(validate)}`)
      resolve(validate)
    })
  }
}


