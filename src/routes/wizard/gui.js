import express from 'express'
import bodyParser from 'body-parser'
import Application from '../../biz/Wizard'

const WizardGUI = module.exports = express()
      WizardGUI.set('views','./view/wizard')
      WizardGUI.set('view engine', 'pug')
      WizardGUI.use(bodyParser.json())
      WizardGUI.use(bodyParser.urlencoded({extended:false}))

WizardGUI.get('/wizard/loadOptions',function(req,res){
  Application.loadOptions()
  .then((fromApp) => {
    res.render('wizard',{options: fromApp.options, adminUserOptions: fromApp.adminUserOptions})
  })
})

WizardGUI.get('/favicon.ico',function(req,res){
  res.status(200).end()
}) //fixme: wtf is this

WizardGUI.get('*',function(req,res){
  res.redirect('/wizard/loadOptions')
})

WizardGUI.post('/wizard/testOptions',function(req,res){
  Application.testOptions(req.body)
  .then((fromApp) => {
    res.render('wizard',{ status: fromApp.status, options: fromApp.options, adminUserOptions: fromApp.adminUserOptions })
  })
})

WizardGUI.post('/wizard/restart',function(req,res){
  Application.restart({protocol: req.protocol, hostname: req.hostname})
  .then((fromApp) => {
    res.render('restart', {redirectURL: fromApp.redirectURL})
  })
})
