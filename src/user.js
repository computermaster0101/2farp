const dao = require('./dao.js')
exports.connect=dao.startDB

exports.getByUsername = function(username){
    return new Promise((resolve,reject) => {
        dao.pullOne({obj:'user',username:username})
            .then((user) => {
                if(user.error){
                    user.error=`Invalid Username`
                    return reject(user)
                }else{
                    resolve(user)
                }
            })
    }).catch((error) => {
        console.log(`user.getByUsername - ${error.username} - ${error.error}`)
        return error
    })
}