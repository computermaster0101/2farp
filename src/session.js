const imo = require('./imo.js')

exports.create = function(validUser){
    return new Promise((resolve,reject) => {
        if(validUser.error){
            //console.log(`hitTheErrorNoValidUser`)
            reject(validUser)
        }else{
            //console.log(`${JSON.stringify(validUser)}`)
            resolve(validUser)
        }
    }).catch((error) => {
        console.log(`app.createSession. - ${error.username} - ${error.error}`)
        return error
    })
}
