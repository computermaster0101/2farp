import DatasourceService from '../common/DatasourceService'
import { Database } from '../../db/DatabaseConnector'

export default class DatabaseService extends DatasourceService {

  static build = function(){
    return Database.sync()
  }

}