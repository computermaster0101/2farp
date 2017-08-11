const imo = require('./dao.js')

exports.create = function(validUser){
    return new Promise((resolve,reject) => {
        if(validUser.error){reject(validUser)}
        let sessionData = {key: validUser.cookey, timestamp: new Date().getTime(), username:validUser.username}
        resolve(sessionData)
    }).catch((error) => {
        console.log(`session.create - ${error.username} - ${error.error}`)
        return error
    })
}
