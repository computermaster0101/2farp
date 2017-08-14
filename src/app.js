const User = require('./user.js');
const Session = require('./session.js');
const token = require('speakeasy');
const sha256 =  require('sha256');

exports.connectDB=User.connect

exports.authenticate = function(login){
    return User.getByUsername(login.username)
          .then((user) => checkUserLogin(user,login))
          .then((sessionInfo) => Session.create(sessionInfo))
}

function checkUserLogin(user,login){
    return new Promise((resolve,reject) => {
        if(login.password == ""){
            throw new Error(`Null Password`);
        }else if(login.token == ""){
            throw new Error(`Null Token`);
        }else if(user.password != sha256(user.salt+login.password)){
            throw new Error(`Invalid Password`);
        }else if(!token.totp.verify({secret:user.key,token:login.token,encoding:'base32',window:1})){ //fixme: remove the window, for testing only due time time issues on laptop vm
            throw new Error(`Invalid Token`);
        }
        let sessionKey = token.generateSecret({length: 32}).ascii
        let sessionInfo = {key: sessionKey, keyHash: sha256(user.salt+sessionKey), username: login.username, timestamp: new Date().getTime()}
        resolve(sessionInfo)
    })
}
