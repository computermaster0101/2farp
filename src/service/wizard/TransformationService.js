export default class Transformer {

  static transformDatasourceFromWizard = function(fromWizard){
    return new Promise((resolve, reject) => {
      resolve({
        application: {
          gui: {
            port: parseInt(fromWizard.guiPort) || fromWizard.guiPort
          },
          api: {
            port: parseInt(fromWizard.apiPort) || fromWizard.apiPort
          },
        },
        datasource: {
          database: fromWizard.database,
          host: fromWizard.host,
          port: parseInt(fromWizard.port) || fromWizard.port,
          username: fromWizard.username,
          pass: fromWizard.pass,
          dialect: fromWizard.dialect
        }
      })
    })
  }

}