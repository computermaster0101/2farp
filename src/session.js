const dao = require('./dao.js')

exports.create = function(sessionInfo){
    return dao.createOne(sessionInfo)
        .then((sessionId) => dao.getById(sessionId))
        .then((session) => {
            sessionData = {id: session._id, key: sessionInfo.key, username: session.username, timestamp: session.timestamp}
            return sessionData
        })
        .catch((error) => {
            console.log(`session.create.error - ${JSON.stringify(error)}`)
            throw new Error(`${error.error}`);
        })
}