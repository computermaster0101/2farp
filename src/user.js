const dao = require('./dao.js')
exports.connect=dao.startDB

exports.getByUsername = function(username){
    return dao.pullOne({obj:'user',username:username})
      .catch((error) => {
        console.error(`UserService: error occurred: ${JSON.stringify(error)}`)
        throw new Error(`Invalid Username`);
      })
}