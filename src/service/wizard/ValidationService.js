import Logger from '../common/Logger'
import OptionsValidator from '../common/OptionsValidator'

export default class Validator {

  static validateOptions = OptionsValidator.validate

  static validateAdmin = function(admin){
    return new Promise((resolve,reject) => {
      Logger.info(`validate admin`)

      const defaults = {
        username: 'administrator',
        password: '',
        first: 'admin',
        last: 'istrator',
        phone: '123-456-7890',
        email: 'admin@example.com'
      }

      let valid = {
        username: {
          key: 'Username',
          type: 'text',
          value: (typeof(admin.username) != 'string') ? defaults.username : admin.username,
          message: (typeof(admin.username) != 'string') ? `using default username ${admin.username} is not a string` : `username ${admin.username} validated`
        },
        password: {
          key: 'Password',
          type: 'password',
          value: (typeof(admin.password) != 'string') ? defaults.password : admin.password,
          message: (typeof(admin.password) != 'string') ? `using default password ${admin.password} is not a string` : `password validated`
        },
        first: {
          key: 'First Name',
          type: 'text',
          value: (typeof(admin.first) != 'string') ? defaults.first : admin.first,
          message: (typeof(admin.first) != 'string') ? `using default first name ${admin.first} is not a string` : `first name ${admin.first} validated`
        },
        last: {
          key: 'Last Name',
          type: 'text',
          value: (typeof(admin.last) != 'string') ? defaults.last : admin.last,
          message: (typeof(admin.last) != 'string') ? `using default last name ${admin.last} is not a string` : `last name ${admin.last} validated`
        },
        phone: {
          key: 'Phone Number',
          type: 'tel',
          value: (typeof(admin.phone) != 'string') ? defaults.phone : admin.phone,
          message: (typeof(admin.phone) != 'string') ? `using default phone number ${admin.phone} is not a string` : `phone ${admin.phone} validated`
        },
        email: {
          key: 'Email Address',
          type: 'email',
          value: (typeof(admin.email) != 'string') ? defaults.email : admin.email,
          message: (typeof(admin.email) != 'string') ? `using default email ${admin.email} is not a string` : `email ${admin.email} validated`
        }
      }

      Logger.debug(`defaults: ${JSON.stringify(defaults)}`)
      Logger.debug(`admin: ${JSON.stringify(admin)}`)
      Logger.debug(`valid: ${JSON.stringify(valid)}`)
      resolve(valid)

    }).catch((e) => console.log(e))
  }

}
