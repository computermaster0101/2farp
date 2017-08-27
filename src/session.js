const dao = require('./dao.js')

exports.create = function(sessionInfo){
    return dao.removeOne({obj: 'session', username: sessionInfo.username, sourceIP: sessionInfo.sourceIP, sourceHostname: sessionInfo.sourceHostname})
        .then (() => dao.createOne({obj: 'session', username: sessionInfo.username, sourceIP: sessionInfo.sourceIP, sourceHostname: sessionInfo.sourceHostname, keyHash: sessionInfo.keyHash, timestamp: sessionInfo.timestamp}))
        .then((sessionId) => dao.getById(sessionId))
        .then((session) => {
            return {id: session._id, key: sessionInfo.key}
        })
        .catch((error) => {
            console.log(`session.create.error - ${JSON.stringify(error)}`)
            throw new Error(`${error.error}`);
        })
}

exports.remove = function(sessionInfo){
    return dao.removeOne({obj: 'session', username: sessionInfo.username, sourceIP: sessionInfo.sourceIP, sourceHostname: sessionInfo.sourceHostname})
}

exports.update = function(session){
    return dao.update(session)
        .catch((error) => {
            console.log(`session.update.error - ${JSON.stringify(error)}`)
            throw new Error(`${error.error}`);
        })
}

exports.getById = function(sessionId){
    return dao.getById(sessionId)
        .catch((error) => {
            console.log(`session.getById.error: Invalid Session Id: ${sessionId}`)
            throw new Error(`Invalid Session`)
        })
}
