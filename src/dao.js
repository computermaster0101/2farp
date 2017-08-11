const tinydb = require('tinydb');
const db = new tinydb('./2farp.db');

exports.startDB = function(cb){
    db.onReady = function(){cb()};
}

exports.pullOne = function(obj){
    return new Promise((resolve,reject) => {
        db.find(obj,function(err,results){
            if(err){
                let result = obj
                result.error = `item not in database`
                reject(result)
            }else{
                let result = results[0];
                resolve(result)
            }
        })
    }).catch((error) => {
        console.log(`dao.pullOne - ${JSON.stringify(obj)} - ${error.error}`)
        return error
    })
}

function create(obj){}