import {Builder} from 'sequelize-classes'
import {User} from '../domain/User'

const options = {
  database: "2farp",
  username: "root",
  pass: "toor",
  config: {
    host: "localhost",
    port: 3306,
    logging: false,
    dialect: "mysql2"
  }
}

let instance = null

export default class DatabaseConnector {
  constructor(){
    if(!instance){
      instance = this
      this.db = new Builder(options, [User])
    }
    return this
  }

  static getInstance(){
    if(!instance){
      instance = new DatabaseConnector()
    }
    return instance.db
  }

}