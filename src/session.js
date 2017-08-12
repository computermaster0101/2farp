const dao = require('./dao.js')
/*
exports.create = function(validUser){
    return new Promise((resolve,reject) => {
            if(validUser.error){reject(validUser)}
            let sessionData = {key: validUser.sessionKey, timestamp: new Date().getTime(), username:validUser.username}
            resolve(sessionData)
        }
    }).catch((error) => {
        console.log(`session.create - ${error.username} - ${error.error}`)
        return error
    })
}
*/
exports.create = function(validUser){
    return new Promise((resolve,reject) => {
        if(validUser.error){return reject(validUser)}
        dao.createOne({obj: 'session', key: validUser.sessionKey, username: validUser.username, timestamp: new Date().getTime()})
            .then((sessionId) => dao.getById(sessionId))
            .then((session) => {
                if(session.error){
                    reject(session)
                }else{
                    resolve(session)
                }
            })
    }).catch((error) => {
        console.log(`session.create - ${error.username} - ${error.error}`)
        return error
    })
}