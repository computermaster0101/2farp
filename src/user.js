const dao = require('./dao.js')

exports.connect=dao.startDB

exports.getByUsername = function(username){
    return new Promise((resolve,reject) => {
        dao.pullOne({obj:'user',username:username})
            .then((user) => {
                if(user.username){
                    resolve(user)
                }else{
                    reject(`invalid username`)
                }
            })
    }).catch((err) => {
        console.log(`user.getByUsername.catch - ${err} - ${username}`)
        return err
    })
}