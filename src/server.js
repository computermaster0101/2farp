import TwoFactorAuthenticationReverseProxy from './biz/2farp'

const application = TwoFactorAuthenticationReverseProxy

let port = 9000;

const express = require('express'); //https://www.npmjs.com/package/express
const web = express();


web.listen(port,function(){
  application.databaseBuilder()
  console.log(`server is running on port ${port}`)
})

