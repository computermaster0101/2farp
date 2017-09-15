const application = require ('./biz/2farp');

let port = 9000;

const express = require('express'); //https://www.npmjs.com/package/express
const web = express();


web.listen(port,function(){
  console.log(`server is running on port ${port}`)
})

