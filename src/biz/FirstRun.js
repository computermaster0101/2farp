import fs from 'fs'
import Bootstrapper from './bootstrapper'

let datasourceFile = './datasource.json'

export default class Application extends Bootstrapper{



  static saveProperties = function(datasourceOptions){
    return this.validateProperties(datasourceOptions)
      .then((validOptions) => {
        console.log(`writing database info to file ${datasourceFile}`)
        fs.writeFileSync(`${datasourceFile}`, JSON.stringify(validOptions), 'utf8')
      })
  }

  static respawn = function(){}

}