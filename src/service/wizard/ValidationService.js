import Logger from '../common/Logger'
import OptionsValidator from '../common/OptionsValidator'
import qrcode from 'qrcode'
import speakeasy from 'speakeasy'


export default class Validator {

  static validateDatasource = OptionsValidator.validate

  static validateAdmin = function(options){
    return new Promise((resolve,reject) => {
      Logger.info(`validating admin`)
      Logger.debug(`validating ${JSON.stringify(options)}`)

      let secret = speakeasy.generateSecret()
      qrcode.toDataURL(secret.otpauth_url,function(err,url){
        let defaults = {
          first: 'admin',
          last: 'istrator',
          phone: '123-456-7890',
          email: 'admin@example.com',
          username: 'admin',
          password: 'nimda',
          qrData: secret.otpauth_url,
          qrCode: url
        }

      let valid = {
        first: [
          (typeof(options.first) != 'string') ? defaults.first : options.first,
          (typeof(options.first) != 'string') ? `using default first name ${options.first} is not a string` : `first name ${options.first} validated`
        ],
        last: [
          (typeof(options.last) != 'string') ? defaults.last : options.last,
          (typeof(options.last) != 'string') ? `using default last name ${options.last} is not a string` : `last name ${options.last} validated`
        ],
        phone: [
          (typeof(options.phone) != 'string') ? defaults.phone : options.phone,
          (typeof(options.phone) != 'string') ? `using default phone ${options.phone} is not a string` : `phone ${options.phone} validated`
        ],
        email: [
          (typeof(options.email) != 'string') ? defaults.email : options.email,
          (typeof(options.email) != 'string') ? `using default email ${options.email} is not a string` : `email ${options.email} validated`
        ],
        username: [
          (typeof(options.username) != 'string') ? defaults.username : options.username,
          (typeof(options.username) != 'string') ? `using default username ${options.username} is not a string` : `username ${options.username} validated`
        ],
        password: [
          (typeof(options.password) != 'string') ? defaults.password : options.password,
          (typeof(options.password) != 'string') ? `using default password ${options.password} is not a string` : `password validated`
        ],
        qrData: [
          (typeof(options.qrData) != 'string') ? defaults.qrData : options.qrData,
          (typeof(options.qrData) != 'string') ? `using default qrData ${options.qrData} is not a string` : `qrData validated`
        ],
        qrCode: [
          (typeof(options.qrCode) != 'string') ? defaults.qrCode : options.qrCode,
          (typeof(options.qrCode) != 'string') ? `using default qrCode ${options.qrCode} is not a string` : `qrCode validated`
        ],
      }

       Logger.debug(`validated ${JSON.stringify(valid)}`)
       resolve(valid)

      })

    })
  }

}