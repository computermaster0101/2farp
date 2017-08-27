const User = require('./user.js');
const Session = require('./session.js');
const token = require('speakeasy');
const sha256 =  require('sha256');

exports.connectDB=User.connect

exports.validate = function(session){
    return Session.getById(session.id)
        .then((sessionData) => {
            return User.getByUsername(sessionData.username)
                .then((userData) => {
                    if(session.sourceIP != sessionData.sourceIP){
                        session.error = `Invalid Source Address`
                    }else if(session.sourceHostname != sessionData.sourceHostname){
                        session.error = `Invalid Source Hostname`
                    }else if(sha256(userData.salt+session.key) != sessionData.keyHash){
                        session.error = `Invalid Session Key`
                    }
                    if(session.error){
                        Session.remove(sessionData)
                        throw new Error(`${session.error}`)
                    }else{
                        sessionData.timestamp = new Date().getTime()
                        Session.update(sessionData)
                        Promise.resolve()
                    }
                })
        })
}

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
        }else if(!token.totp.verify({secret:user.key,token:login.token,encoding:'base32',window:2})){ //todo: remove window once working (for testing only)
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
