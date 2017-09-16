import { fs } from 'fs'

export default class Helper{

  databaseOptions
  datasourceFile = './datasource.json'

  static getDatasource = function(){
    fs.readFile(datasourceFile, 'utf8', function(err, data) {
      if (err) {
        console.log(`$err`)
        this.databaseOptions = null;
      } else {
        try {
          this.databaseOptions = JSON.parse(data.toString())
        } catch(e) {
          throw new Error('database format error!')
        }
      }
      return this.databaseOptions
    })
  }
  static setDatasource = function(databaseOptions){
    fs.writeFileSync(datasourceFile, JSON.stringify(databaseOptions), 'utf8')
  }

}