import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import Application from '../../biz/Application'


const MainGUI = module.exports = express()
      MainGUI.set('views','./view/main')
      MainGUI.set('view engine', 'pug')
      MainGUI.use(cookieParser())
      MainGUI.use(bodyParser.json())
      MainGUI.use(bodyParser.urlencoded({extended:false}))

MainGUI.get('*',function(req,res){

  Application.routeRequest(req)
  .then((fromApp) => {
    switch(fromApp.action){
      case 'render': res.render(fromApp.data); break;
      case 'json': res.json(fromApp.data); break;
    }
  })

})

