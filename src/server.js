import TwoFactorAuthenticationReverseProxy from './biz/2farp'

const application = TwoFactorAuthenticationReverseProxy

let port = 9000;

const express = require('express'); //https://www.npmjs.com/package/express
const web = express();


web.listen(port,function(){
  console.log(`server is running on port ${port}`)
  application.firstRun({database: "2farp_dev", username: "root", password: "toor", host: "localhost", port: 3306, logging: false, dialect: "mysql"})
  application.databaseBuilder()
})

