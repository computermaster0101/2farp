import { Route } from '../db/DatabaseConnector'

export default class RouteService {
  static addDefaults = function(){
    return Route.create({name: 'Default', path: '/', destination: 'http://localhost:8080/', authenticated: false})
  }
}