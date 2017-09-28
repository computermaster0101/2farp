import Bootstrapper from './Bootstrapper'
import Logger from 'bunyan-log'
import cluster from 'cluster'
import os from 'os'

if(cluster.isMaster){ //todo: requires code review
  const log = new Logger({name:'master', useStdOut: true, isNewProcess: true})

  const multiThreaded = false
  let maxThreads

  if(multiThreaded){
    maxThreads = (os.cpus().length * 2) //fixme: true value
  }else{
    maxThreads = 1 //fixme: testing value
  }

  log.info(`application thread pool started`)
  log.info(`generating ${maxThreads} worker threads`)
  for(let i = 0; i < maxThreads; i++){
    cluster.fork()
  }
  cluster.on('exit',(worker, code, signal) => {
    log.info(`work thread died`)
    log.info(`terminating application thread pool`)
    process.exit(0)
  })
}else{
  const log = new Logger({name:'worker', useStdOut: true, isNewProcess: true})
  log.info(`worker thread started`)
  Bootstrapper.startup()
  process.on('SIGTERM', function(){
    log.info(`lost worker thread`)
  })
}
