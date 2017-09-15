import { Option } from '../db/DatabaseConnector'

export default class OptionService {
  static addDefaults = function(){
    return Option.bulkCreate([
      {key: 'Force email as username', value: 'false'},
      {key: 'Enable "Account Signup"', value: 'false'},
      {key: 'Enable "Update Profile"', value: 'false'},
      {key: 'Default session timeout (ms)', value: '36000'},
      {key: 'Notify admins when accounts lock', value: 'false'},
      {key: 'Notify user when account locks', value: 'false'},
      {key: 'Password expiration minimum policy (days)', value: '90'},
      {key: 'Password expiration maximum policy (days)', value: '90'},
      {key: 'Password expiration soft notification (days)', value: '90'},
      {key: 'Password expiration hard notification (days)', value: '90'},
      {key: 'Account lock policy (attempts)', value: '99'},
      {key: 'Java Mail Options', value: 'Not Configured'}])
  }
}