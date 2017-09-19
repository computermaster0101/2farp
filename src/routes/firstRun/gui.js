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
  properties.firstRun = 'false'
  console.log(`saveSettings: ${JSON.stringify(properties)}`)
  Application.saveProperties(properties)
  qrcode.toDataURL(adminToken.otpauth_url, function(err, qrImage){
    res.render('firstRun',{token: qrImage, status: 'accepted'})
  })
})

FirstRunGUI.post('/application/restart',function(req,res){
  console.log(`restart: ${JSON.stringify(req.body)}`)
  qrcode.toDataURL(adminToken.otpauth_url, function(err, qrImage){
    res.render('firstRun',{token: qrImage, status: 'accepted'})
  })
})