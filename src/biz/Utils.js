import DatabaseConnector from '../db/DatabaseConnector'

export default class Utlis {

  constructor (){}

  createDatabase(){
    let databaseConnector = DatabaseConnector.getInstance()
    databaseConnector.sync()
  }
}