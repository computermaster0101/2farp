const express = require('express') //https://www.npmjs.com/package/express
const bodyParser = require('body-parser')
const speakeasy = require('speakeasy')
const qrGenerator= require('qrcode')

const FirstRunGUI = module.exports = express()

FirstRunGUI.set('views','./view/firstRun')
FirstRunGUI.set('view engine', 'pug')
FirstRunGUI.use(bodyParser.json())
FirstRunGUI.use(bodyParser.urlencoded({extended:false}))

let adminToken

FirstRunGUI.get('*',function(req,res){
  adminToken = speakeasy.generateSecret()
  qrGenerator.toDataURL(adminToken.otpauth_url, function(err, qrImage){
    res.render('firstRun',{token: qrImage})
  })
})

