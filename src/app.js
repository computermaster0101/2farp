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
            login.error = `Null Password`
        }else if(login.token == ""){
            login.error = `Null Token`
        }else if(user.password != sha256(user.salt+login.password)){
            login.error = `Invalid Password`
        }else if(!token.totp.verify({secret:user.key,token:login.token,encoding:'base32'})){
            login.error = `Invalid Token`
        }
        if(login.error){
            Session.remove(login)
            throw new Error(`${login.error}`);
        }else{
            let sessionKey = token.generateSecret({length: 32}).ascii
            resolve({obj: 'session', key: sessionKey, keyHash: sha256(user.salt+sessionKey), username: login.username, sourceIP: login.sourceIP, sourceHostname: login.sourceHostname, timestamp: new Date().getTime()})
        }
    })
}
