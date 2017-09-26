import child_process from 'child_process'
import Logger from 'bunyan-log'

const log = new Logger({name:'watcher', useStdOut: true, streams: [{path: './logs/application.log'}]})

log.info('watcher thread started')

function spawnAppThread(){
  log.info('spawning new application thread pool',{command:`${process.argv}`})
   child_process.spawn(process.argv[0], ['./biz/Main.js'], {
    stdio: 'inherit',
    env: {NODE_CLUSTER_SCHED_POLICY: 'rr'}
  }).on('close',function(){
    log.info('application thread pool terminated')
    spawnAppThread()
  })
}

spawnAppThread()