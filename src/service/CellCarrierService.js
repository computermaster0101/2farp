import { CellCarrier } from '../db/DatabaseConnector'

export default class CellCarrierService {
  static addDefaults = function(){
    return CellCarrier.bulkCreate([{name: 'Verizon', domain: 'vzwpix.com'}])
  }
}