import child_process from 'child_process'

let subprocess

function spawnAppThread(){
  child_process.spawn(process.argv[0], ['./biz/Main.js'], {
    stdio: 'inherit'
  }).on('close', () => {
    console.log('restarting....')
    spawnAppThread()
  })
}

spawnAppThread()