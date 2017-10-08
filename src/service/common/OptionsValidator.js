import Logger from './Logger'

export default class OptionsValidator {

  static validate(options){
    return new Promise((resolve,reject) => {
      Logger.info(`validate options`)

      const defaults = {
        application: {
          apiPort: 8000,
          guiPort: 9000,
          multithreaded: false
        },
        datasource: {
          database: '2farp',
          host: 'localhost',
          port: 3306,
          user: 'root',
          pass: 'toor',
          dialect: 'mysql'
        }
      }

      let valid = {
        application: {
          apiPort: {
            key: 'API Port',
            type: 'number',
            value: (typeof(options.application.apiPort) != 'number') ? defaults.application.apiPort
                 : (options.application.apiPort < 1024) ?  defaults.application.apiPort
                 : (options.application.apiPort > 65535) ? defaults.application.apiPort
                 : options.application.apiPort,
            message: (typeof(options.application.apiPort) != 'number') ? `using default port ${options.application.apiPort} is not a number`
                   : (options.application.apiPort < 1024) ?  `using default port ${options.application.apiPort} is to low`
                   : (options.application.apiPort > 65535) ? `using default port ${options.application.apiPort} is to high`
                   : `port ${options.application.apiPort} validated`
          },
          guiPort: {
            key: 'GUI Port',
            type: 'number',
            value: (typeof(options.application.guiPort) != 'number') ? defaults.application.guiPort
                 : (options.application.guiPort < 1024) ?  defaults.application.guiPort
                 : (options.application.guiPort > 65535) ? defaults.application.guiPort
                 : options.application.guiPort,
            message: (typeof(options.application.guiPort) != 'number') ? `using default port ${options.application.guiPort} is not a number`
                   : (options.application.guiPort < 1024) ?  `using default port ${options.application.guiPort} is to low`
                   : (options.application.guiPort > 65535) ? `using default port ${options.application.guiPort} is to high`
                   : `port ${options.application.guiPort} validated`
          },
          multithreaded: {
            key: 'Multithreaded',
            type: 'radio',
            value: (typeof(options.application.multithreaded) != 'boolean') ? defaults.application.multithreaded
                 : options.application.multithreaded,
            message: (typeof(options.application.multithreaded) != 'boolean') ? `using default ${options.application.multithreaded} is not boolean`
                   : `multithreaded ${options.application.multithreaded} validated`
          }
        },
        datasource: {
          database: {
            key: 'Database Name',
            type: 'text',
            value: (typeof(options.datasource.database) != 'string') ? defaults.datasource.database
                 : options.datasource.database,
            message: (typeof(options.datasource.database) != 'string') ? `using default database name ${options.datasource.database} is not a string`
                   : `database ${options.datasource.database} validated`
          },
          host: {
            key: 'Database Hostname',
            type: 'text',
            value: (typeof(options.datasource.host) != 'string') ? defaults.datasource.host
                 : options.datasource.host,
            message: (typeof(options.datasource.host) != 'string') ? `using default hostname ${options.datasource.host} is not a string`
                   : `host ${options.datasource.host} validated`
          },
          port: {
            key: 'Database Port',
            type: 'number',
            value: (typeof(options.datasource.port) != 'number') ? defaults.datasource.port
                 : (options.datasource.port < 1024) ?  defaults.datasource.port
                 : (options.datasource.port > 65535) ? defaults.datasource.port
                 : options.datasource.port,
            message: (typeof(options.datasource.port) != 'number') ? `using default port ${options.datasource.port} is not a number`
                   : (options.datasource.port < 1024) ?  `using default port ${options.datasource.port} is to low`
                   : (options.datasource.port > 65535) ? `using default port ${options.datasource.port} is to high`
                   : `port ${options.datasource.port} validated`
          },
          user: {
            key: 'Database Username',
            type: 'text',
            value: (typeof(options.datasource.user) != 'string') ? defaults.datasource.user
                 : options.datasource.user,
            message: (typeof(options.datasource.user) != 'string') ? `using default user ${options.datasource.user} is not a string`
                   : `username ${options.datasource.user} validated`
          },
          pass: {
            key: 'Database Password',
            type: 'password',
            value: (typeof(options.datasource.pass) != 'string') ? defaults.datasource.pass
                 : options.datasource.pass,
            message: (typeof(options.datasource.pass) != 'string') ? `using default pass ${options.datasource.pass} is not a string`
                   : `password validated`
          },
          dialect: {
            key: 'Database Dialect',
            type: 'select',
            value: (options.datasource.dialect === 'mysql') ? options.datasource.dialect
                 : (options.datasource.dialect === 'mssql') ? options.datasource.dialect
                 : (options.datasource.dialect === 'sqlite') ? options.datasource.dialect
                 : (options.datasource.dialect === 'postgres') ? options.datasource.dialect
                 : defaults.datasource.dialect,
            message: (options.datasource.dialect === 'mysql') ? `using mysql as datasource`
                   : (options.datasource.dialect === 'mssql') ? `using mssql as datasource`
                   : (options.datasource.dialect === 'sqlite') ? `using sqlite as datasource`
                   : (options.datasource.dialect === 'postgres') ? `using postgres as datasource`
                   : `using default datasource dialect ${options.datasource.dialect} is not supported`
          }
        }
      }

      Logger.debug(`defaults: ${JSON.stringify(defaults)}`)
      Logger.debug(`options: ${JSON.stringify(options)}`)
      Logger.debug(`valid: ${JSON.stringify(valid)}`)
      resolve(valid)

    })
  }

}

