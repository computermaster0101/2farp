import child_process from 'child_process'
import Logger from './service/common/Logger'

function spawnAppThread(){
  Logger.info(`watcher thread started`)
  Logger.info(`spawning application thread pool`)

  child_process.spawn(process.argv[0], ['./biz/Main.js'], {
    stdio: 'inherit',
    env: {NODE_CLUSTER_SCHED_POLICY: 'rr'}
  }).on('close',function(){
    Logger.error(`application thread pool terminated`)
    spawnAppThread()
  })
}

spawnAppThread()