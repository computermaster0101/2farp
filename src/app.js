const User = require('./user.js');
const Session = require('./session.js');
const token = require('speakeasy');
const sha256 =  require('sha256');

exports.connectDB=User.connect

exports.authenticate = function(login){
    return User.getByUsername(login.username)
          .then((user) => checkUserLogin(user,login))

          /*.then((checkedUser) => {
            if(checkedUser.error){
              reject(checkedUser)
            }else(
              resolve(checkedUser)
            )
          })
          .then((validUser) => Session.create(validUser))
          .then((session) => {
            if(session.error){
              reject(session)
            }else{
              resolve(session)
            }
          })*/
}

function checkUserLogin(user,login){
    return new Promise((resolve,reject) => {
        if(user.error){return reject(user)}
        if(login.password == ""){
            login.error=`Null Password`
        }else if(login.token == ""){
            login.error=`Null Token`
        }else if(user.password != sha256(user.salt+login.password)){
            login.error=`Invalid Password`
        }else if(!token.totp.verify({secret:user.key,token:login.token,encoding:'base32',window:1})){ //fixme: remove the window, for testing only due time time issues on laptop vm
            login.error=`Invalid Token`
        }
        if(login.error){
            reject(login)
        }else{
            user.sessionKey = token.generateSecret({length: 32}).ascii
            resolve(user)
        }
    }).catch((error) => {
        console.log(`app.checkUserLogin - ${error.username} - ${error.error}`)
        return error
    })
}
