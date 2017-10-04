const express = require('express'); //https://www.npmjs.com/package/express
const bodyParser = require('body-parser');
import Application from '../../biz/Wizard'

const WizardAPI = module.exports = express();
      WizardAPI.set('views','./view/firstRun')
      WizardAPI.set('view engine', 'pug')
      WizardAPI.use(bodyParser.json())
      WizardAPI.use(bodyParser.urlencoded({extended:false}))

WizardAPI.get('/wizard/loadOptions',function(req,res){
  Application.loadOptions()
  .then((fromApp) => {
    res.json({options: fromApp.options, adminUserOptions: fromApp.adminUserOptions})
  })
})

WizardAPI.get('*',function(req,res){
  res.json({ERROR: 'use /wizard/loadOptions end point for get requests'})
})

WizardAPI.post('/wizard/testOptions',function(req,res){
  Application.testOptions(req.body)
  .then((fromApp) => {
    res.json({ status: fromApp.status, options: fromApp.options, adminUserOptions: fromApp.adminUserOptions })
  })
})