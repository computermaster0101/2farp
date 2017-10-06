import Logger from './Logger'

export default class OptionsValidator {

  static validate(options){
    return new Promise((resolve,reject) => {
      Logger.info(`validating options`)
      Logger.debug(`validating ${JSON.stringify(options)}`)

      const defaults = {
        application: {
          api: {
            port: 8000
          },
          gui: {
            port: 9000
          }
        },
        datasource: {
          database: 'mfarp',
          host: 'localhost',
          port: 3306,
          username: 'root',
          pass: 'toor',
          dialect: 'mysql'
        }
      }

      let valid = {
        application: {
          api: {
            port: [
              (typeof(options.application.api.port) != 'number') ? defaults.application.api.port :
              (options.application.api.port < 1024) ?  defaults.application.api.port :
              (options.application.api.port > 65535) ? defaults.application.api.port :
              options.application.api.port,
              (typeof(options.application.api.port) != 'number') ? `using default port ${options.application.api.port} is not a number` :
              (options.application.api.port < 1024) ?  `using default port ${options.application.api.port} is to low` :
              (options.application.api.port > 65535) ? `using default port ${options.application.api.port} is to high` :
              `port ${options.application.api.port} validated`
            ]
          },
          gui: {
            port: [
              (typeof(options.application.gui.port) != 'number') ? defaults.application.gui.port :
              (options.application.gui.port < 1024) ?  defaults.application.gui.port :
              (options.application.gui.port > 65535) ? defaults.application.gui.port :
              options.application.gui.port,
              (typeof(options.application.gui.port) != 'number') ? `using default port ${options.application.gui.port} is not a number` :
              (options.application.gui.port < 1024) ?  `using default port ${options.application.gui.port} is to low` :
              (options.application.gui.port > 65535) ? `using default port ${options.application.gui.port} is to high` :
              `port ${options.application.gui.port} validated`
            ]
          },
        },
        datasource: {
          database: [
            (typeof(options.datasource.database) != 'string') ? defaults.datasource.database : options.datasource.database,
            (typeof(options.datasource.database) != 'string') ? `using default database ${options.datasource.database} is not a string` : `database ${options.datasource.database} validated`
          ],
          host: [
            (typeof(options.datasource.host) != 'string') ? defaults.datasource.host : options.datasource.host,
            (typeof(options.datasource.host) != 'string') ? `using default host ${options.datasource.host} is not a string` : `host ${options.datasource.host} validated`
          ],
          port: [
            (typeof(options.datasource.port) != 'number') ? defaults.datasource.port :
            (options.datasource.port < 1024) ?  defaults.datasource.port :
            (options.datasource.port > 65535) ? defaults.datasource.port :
            options.datasource.port,
            (typeof(options.datasource.port) != 'number') ? `using default port ${options.application.gui.port} is not a number` :
            (options.datasource.port < 1024) ?  `using default port ${options.datasource.port} is to low` :
            (options.datasource.port > 65535) ? `using default port ${options.datasource.port} is to high` :
            `port ${options.datasource.port} validated`
          ],
          username: [
            (typeof(options.datasource.username) != 'string') ? defaults.datasource.username : options.datasource.username,
            (typeof(options.datasource.username) != 'string') ? `using default username ${options.datasource.username} is not a string` : `username ${options.datasource.username} validated`
          ],
          pass: [
            (typeof(options.datasource.pass) != 'string') ? defaults.datasource.pass : options.datasource.pass,
            (typeof(options.datasource.pass) != 'string') ? `using default pass ${options.datasource.pass} is not a string` : `password validated`
          ],
          dialect: [
            (options.datasource.dialect === 'mysql') ? options.datasource.dialect :
            (options.datasource.dialect === 'mssql') ? options.datasource.dialect :
            (options.datasource.dialect === 'sqlite') ? options.datasource.dialect :
            (options.datasource.dialect === 'postgres') ? options.datasource.dialect :
            defaults.datasource.dialect,
            (options.datasource.dialect === 'mysql') ? `using mysql as datasource` :
            (options.datasource.dialect === 'mssql') ? `using mssql as datasource` :
            (options.datasource.dialect === 'sqlite') ? `using sqlite as datasource` :
            (options.datasource.dialect === 'postgres') ? `using postgres as datasource` :
            `using default datasource dialect ${options.datasource.dialect} is not supported`,
          ]
        }
      }

      Logger.debug(`validated ${JSON.stringify(valid)}`)
      resolve(valid)

    })
  }

}

