import express from 'express'
import bodyParser from 'body-parser'
import speakeasy from 'speakeasy'
import qrcode from 'qrcode'
import Application from '../../biz/FirstRun'


const FirstRunGUI = module.exports = express()
      FirstRunGUI.set('views','./view/firstRun')
      FirstRunGUI.set('view engine', 'pug')
      FirstRunGUI.use(bodyParser.json())
      FirstRunGUI.use(bodyParser.urlencoded({extended:false}))

let adminToken

FirstRunGUI.get('*',function(req,res){
  adminToken = speakeasy.generateSecret()
  Application.getProperties()
  qrcode.toDataURL(adminToken.otpauth_url, function(err, qrImage){
    res.render('firstRun',{token: qrImage})
  })
})


FirstRunGUI.post('/database/saveSettings',function(req,res){
  let properties = req.body
  properties.firstRun = 'true'
  Application.saveProperties(properties)
  .then((status) => {
    qrcode.toDataURL(adminToken.otpauth_url, function(err, qrImage){
      res.render('firstRun',{token: qrImage, status: status})
    })
  })
})

FirstRunGUI.post('/application/restart',function(req,res){
  let properties = req.body
  properties.firstRun = 'true'
  Application.respawn()
  .then((status) => {
    qrcode.toDataURL(adminToken.otpauth_url, function(err, qrImage){
      res.render('firstRun',{token: qrImage, status: status})
    })
  })
})