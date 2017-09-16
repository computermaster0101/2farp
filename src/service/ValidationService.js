export default class ValidationService {

  static databaseOptions = function(databaseOptions){
    let database = databaseOptions.database
    let username = databaseOptions.username
    let password = databaseOptions.password
    let host = databaseOptions.host
    let port = databaseOptions.port
    let type = databaseOptions.dialect
    let logging = databaseOptions.logging
  }

}