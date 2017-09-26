const express = require('express'); //https://www.npmjs.com/package/express
const bodyParser = require('body-parser');
import Application from '../../biz/Wizard'

let WizardAPI = module.exports = express();

WizardAPI.set('views','./view/firstRun')
WizardAPI.set('view engine', 'pug')
WizardAPI.use(bodyParser.json())
WizardAPI.use(bodyParser.urlencoded({extended:false}))


WizardAPI.get('*',function(req,res){
  res.json({ERROR: 'use /wizard/loadOptions end point for get requests'})
})

