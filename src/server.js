import {Utils} from './biz/Utils';

let port = 9000;
let dbUtils = Utils

const express = require('express'); //https://www.npmjs.com/package/express
const web = express();


web.listen(port,function(){
  console.log(`server is running on port ${port}`)
  dbUtils.createDatabase()
})

