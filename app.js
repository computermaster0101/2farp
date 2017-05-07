const User = require('./user.js');
const token = require('speakeasy');
const sha256 =  require('sha256');

exports.connectDB=User.connect

exports.authenticateUser = function(login){
    return new Promise((resolve,reject) => {
        User.getByUsername(login.username)
            .then((user) => checkUserLogin(user,login))
            .then((success) => {
                if(success.valid){
                    resolve(success)
                }else{
                    reject(success)
                }

            })
    }).catch((err) => {
        console.log(`app.authenticateUser.catch - ${err} - ${login.username}`)
        return err
    })
}

function checkUserLogin(user,login){
    return new Promise((resolve,reject) => {
        getPasswordHash(user,login)
            .then((passwordHash) => {
                if(passwordHash.valid){
                    if(passwordHash.value == user.password){
                        if(token.totp.verify({secret:user.key,token:login.token,encoding:'base32',window:1})){ //fixme: remove the window, for testing only due time time issues on laptop vm
                            resolve({valid:true})
                        }else{
                            reject(`invalid token`)
                        }
                    }else{
                        reject(`invalid password`)
                    }
                }else{
                    reject(passwordHash)
                }
            })
    }).catch((err) => {
        console.log(`app.checkUserLogin.catch - ${err} - ${login.username}`)
        return err
    })
}


function getPasswordHash(user,login){
    return new Promise((resolve,reject) => {
        if(!user.salt){reject(user)}
        if(login.password){
            resolve({valid:true,value:sha256(user.salt+login.password)})
        }else{
            reject(`null password`)
        }
    }).catch((err) => {
        console.log(`app.getPasswordHash.catch - ${err}`)
        return err
    })
}

