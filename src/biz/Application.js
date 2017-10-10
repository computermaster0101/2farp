import Logger from '../service/common/Logger'


export default class Application {

  static routeRequest = function(request){
    return new Promise((resolve,reject) => {

      let path='/' + request.path.split('/').slice(1)[0]
      Logger.info(`${path}`)
      Logger.info(`${request.path}`)

      let returned = (path === '/login') ? { action: 'render', data: 'login' } :
                     (path === '/admin') ? { action: 'render', data: 'admin' } :
                     (path === '/noRouteRequested') ? { action: 'render', data: 'noRouteRequested' } :
                     { action: 'json', data: { pid: process.pid } }

      resolve(returned)
    })
  }

}