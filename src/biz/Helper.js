import fs from 'fs'

let datasourceFile = './datasource.json'

export class Datasource{

  static get = function(){
    return new Promise((resolve,reject) => {
      console.log(`reading database info from file ${datasourceFile}`)
      let options
      fs.readFile(`${datasourceFile}`, 'utf8', function(err, data) {
        if (err) {
          console.log(`$err`)
          resolve(null)
        } else {
          try {
            options = JSON.parse(data.toString())
          } catch(e) {
            reject(`${datasourceFile} format error!`)
          }
      }
      resolve(options)
      })
    })
  }

  static set = function(databaseOptions){
    console.log(`writing database info to file ${datasourceFile}`)
    fs.writeFileSync(`${datasourceFile}`, JSON.stringify(databaseOptions), 'utf8')
  }

}