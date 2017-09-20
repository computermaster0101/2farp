import Bootstrapper from './biz/Bootstrapper'
import FirstRunAPI from './routes/firstRun/api'
import FirstRunGUI from './routes/firstRun/gui'
import MainAPI from './routes/main/api'
import MainGUI from './routes/main/gui'

let apiDefaultPort = 8000
let guiDefaultPort = 9000;


let firstRun = true;
let apiPort
let guiPort


const express = require('express'); //https://www.npmjs.com/package/express
const api = express()
const gui = express()

Bootstrapper.getProperties()
.then((appProperties) => {
  if(appProperties.firstRun === 'true'){
    console.log(`loading first run properties`)
    apiPort = apiDefaultPort
    guiPort = guiDefaultPort
    console.log(`loading first run api`)
    api.use(FirstRunAPI)
    console.log(`loading first run gui`)
    gui.use(FirstRunGUI)
  }else{
    console.log(`loading main application properties`)
    apiPort = appProperties.apiPort
    guiPort = appProperties.guiPort
    console.log(`loading main api`)
    api.use(MainAPI)
    console.log(`loading main gui`)
    gui.use(MainGUI)
  }
})
.then(() => {
  console.log(`starting API`)
  api.listen(apiPort, function(){
    console.log(`API listening on port ${apiPort}`)
    console.log(`starting GUI`)
    gui.listen(guiPort, function(){
      console.log(`GUI listening on port ${guiPort}`)
    })
  })
})
//app.firstRun({firstRun: true, apiPort: "8080", guiPort: "8081", database: "2farp_dev", username: "root", password: "toor", host: "localhost", port: 3306, logging: false, dialect: "mysql"})






