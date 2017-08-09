const User = require('./user.js');
const Session = require('./session.js');
const token = require('speakeasy');
const sha256 =  require('sha256');

exports.connectDB=User.connect

exports.authenticate = function(login){ //login = {username: req.body.username, password: req.body.password, token: req.body.token}
    return new Promise((resolve,reject) => {
        User.getByUsername(login.username)
            .then((user) => {
                if(user.error){reject(user)}
                if(login.password == ""){
                    login.error=`Null Password`
                }else if(login.token == ""){
                    login.error=`Null Token`
                }else if(user.password != sha256(user.salt+login.password)){
                    login.error=`Invalid Password`
                }else if(!token.totp.verify({secret:user.key,token:login.token,encoding:'base32',window:0})){ //fixme: remove the window, for testing only due time time issues on laptop vm
                    login.error=`Invalid Token`
                }
                if(login.error){
                    reject(login)
                }else{
                    resolve(user)
                }
            })
    }).catch((error) => {
        console.log(`app.authenticate.catch - ${error.username} - ${error.error}`)
        return error
    })
} //session = {id: id, statusCode: statusCode, timestamp: timestamp, username: username, error: error}
