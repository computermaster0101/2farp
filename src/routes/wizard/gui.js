import express from 'express'
import bodyParser from 'body-parser'
import speakeasy from 'speakeasy'
import qrcode from 'qrcode'
import Application from '../../biz/Wizard'
import Logger from 'bunyan-log'

const log = new Logger({name:'gui', useStdOut: true, isNewProcess: true})


const WizardGUI = module.exports = express()
      WizardGUI.set('views','./view/wizard')
      WizardGUI.set('view engine', 'pug')
      WizardGUI.use(bodyParser.json())
      WizardGUI.use(bodyParser.urlencoded({extended:false}))

WizardGUI.get('/wizard/loadOptions',function(req,res){
  Application.loadOptions()
  .then((fromApp) => {
    res.render('wizard',{properties: fromApp})
  })
})
WizardGUI.get('/favicon.ico',function(req,res){
  res.status(200).end()
}) //fixme: wtf is this

WizardGUI.get('*',function(req,res){
  res.redirect('/wizard/loadOptions')
})

WizardGUI.post('/wizard/testOptions',function(req,res){
  let fromUser = req.body
  Application.testOptions(fromUser)
  .then((fromApp) => {
    res.render('wizard',{properties: fromApp.properties, status:fromApp.status})
  })
})

WizardGUI.post('/wizard/restart',function(req,res){
  Application.restart()
  .then((fromApp) => {
    res.render('restart', {redirectURL: fromApp.redirectURL})
  })
})
