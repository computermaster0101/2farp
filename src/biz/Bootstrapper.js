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
          } catch(e) {
            options = {firstRun: 'true'}
          }
        }
        resolve(options)
      })
    })
  }

}


