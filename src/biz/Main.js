import Logger from '../service/common/Logger'
import Bootstrapper from './Bootstrapper'
import cluster from 'cluster'
import os from 'os'

cluster.isMaster ? launchMaster() : launchWorker()

function launchMaster(){
  Logger.info(`master thread started`)

  const multiThreaded = false
  const maxThreads = multiThreaded ? (os.cpus().length * 2) : 1

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
function launchWorker(){
  Logger.info(`worker thread started`)

  Bootstrapper.startup()
  process.on('SIGTERM', function(){
    Logger.error(`lost worker thread`)
  })

}