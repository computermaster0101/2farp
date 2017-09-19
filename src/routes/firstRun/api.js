const express = require('express'); //https://www.npmjs.com/package/express
const bodyParser = require('body-parser');

let FirstRunAPI = module.exports = express();

FirstRunAPI.set('views','./view/firstRun')
FirstRunAPI.set('view engine', 'pug')
FirstRunAPI.use(bodyParser.json())
FirstRunAPI.use(bodyParser.urlencoded({extended:false}))

FirstRunAPI.get('*',function(req,res){
  res.json({ERROR: 'No get api end points exist when the first run wizard is active'})
})