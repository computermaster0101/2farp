import child_process from 'child_process'

let subprocess

function spawnAppThread(){
  child_process.spawnSync(process.argv[0], ['./biz/Main.js'], {
    stdio: 'inherit'
  })
  console.log('restarting....')
  spawnAppThread()

}

spawnAppThread()