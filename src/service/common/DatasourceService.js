import { DatabaseConnector, Database } from '../../db/DatabaseConnector'

export default class DatasourceService {

  static test = function(options){
    return DatabaseConnector(options)
    .then(() => Database.authenticate())
  }

}