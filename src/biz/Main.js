import Logger from '../service/common/Logger'
import fsReader from '../service/common/fsLoader'
import OptionsValidator from '../service/common/OptionsValidator'
import Bootstrapper from './Bootstrapper'
import cluster from 'cluster'
import os from 'os'


Logger.info(`beginning application startup`)
fsReader.read()
.then((fromFile) => OptionsValidator.validate(fromFile))
.then((validOptions) => {cluster.isMaster ? launchMaster(validOptions) : launchWorker(validOptions)})



function launchMaster(options){
  Logger.info(`master thread started`)

  const maxThreads = options.application.multithreaded.value ? (os.cpus().length * 2) : 1

  Logger.info(`spawning ${maxThreads} worker thread(s)`)

  for(let i = 0; i < maxThreads; i++){
    cluster.fork()
  }

  cluster.on('exit',(worker, code, signal) => {
    Logger.error(`work thread died`)
    Logger.error(`terminating application thread pool`)
    process.exit(0)
  })

}


function launchWorker(options){
  Logger.info(`worker thread started`)

  Bootstrapper.startup(options)
  process.on('SIGTERM', function(){
    Logger.error(`lost worker thread`)
  })

}