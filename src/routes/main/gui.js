import express from 'express'
import bodyParser from 'body-parser'
import speakeasy from 'speakeasy'
import qrcode from 'qrcode'
import Application from '../../biz/Main'


const MainGUI = module.exports = express()
      MainGUI.set('views','./view/main')
      MainGUI.set('view engine', 'pug')
      MainGUI.use(bodyParser.json())
      MainGUI.use(bodyParser.urlencoded({extended:false}))

MainGUI.get('*',function(req,res){
  res.render('login')
})
