import { Datasource } from './Helper'

exports.writeDatasource = function(databaseOptions){
  Datasource.set(databaseOptions)
}

exports.readDatasource = function(){
  let databaseOptions = Datasource.get() //fixme: I know dataOptions in Helper.Datasource.get() gets set but its not returning here. Im out of scope but done know why.
  console.log(`Utilities databaseOptions: ${JSON.stringify(databaseOptions)}`)
  return databaseOptions
}