import { AccessGroupRule } from '../db/DatabaseConnector'

export default class AccessGroupRuleService {
  static addDefaults = function(accessGroupId, routeId){

    AccessGroupRule.create({AccessGroupId: accessGroupId, RouteId: routeId})
  }
}