import { Datasource } from './Helper'

exports.writeDatasource = function(databaseOptions){
  Datasource.set(databaseOptions)
}

exports.readDatasource = function(){
  return Datasource.get()
}