const dao = require('./dao.js')

exports.create = function(sessionInfo){
    return dao.removeOne({obj: 'session', username: sessionInfo.username, sourceIP: sessionInfo.sourceIP, sourceHostname: sessionInfo.sourceHostname})
        .then (() => dao.createOne({obj: 'session', username: sessionInfo.username, sourceIP: sessionInfo.sourceIP, sourceHostname: sessionInfo.sourceHostname, keyHash: sessionInfo.keyHash, timestamp: sessionInfo.timestamp}))
        .then((sessionId) => dao.getById(sessionId))
        .then((session) => {
            //note: since the initial timestamp on a session can be used to calculate the key, this should not be returned in the sessionData
            sessionData = {id: session._id, key: sessionInfo.key}
            return sessionData
        })
        .catch((error) => {
            console.log(`session.create.error - ${JSON.stringify(error)}`)
            throw new Error(`${error.error}`);
        })
}

exports.remove = function(sessionInfo){
    return dao.removeOne({obj: 'session', username: sessionInfo.username, sourceIP: sessionInfo.sourceIP, sourceHostname: sessionInfo.sourceHostname})
}