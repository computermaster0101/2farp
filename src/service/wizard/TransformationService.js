export default class Transformer {

  static transformFromWizard = function(fromWizard){
    return new Promise((resolve, reject) => {
      resolve({
        application: {
          apiPort: parseInt(fromWizard.apiPort) || fromWizard.apiPort,
          guiPort: parseInt(fromWizard.guiPort) || fromWizard.guiPort,
          multithreaded: (fromWizard.multithreaded === "true") ? true : false
        },
        datasource: {
          database: fromWizard.database,
          host: fromWizard.host,
          port: parseInt(fromWizard.port) || fromWizard.port,
          user: fromWizard.user,
          pass: fromWizard.pass,
          dialect: fromWizard.dialect
        }
      })
    })
  }

}