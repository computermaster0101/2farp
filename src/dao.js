const tinydb = require('tinydb');
const db = new tinydb('./2farp.db');

exports.pullOne = function(obj){
    return new Promise((resolve,reject) => {
        db.find(obj,function(err,results){
            if(err){
                reject(`item not in database`)
            }else{
                let result = results[0];
                resolve(result)
            }
        })
    }).catch((err) => {
        console.log(`dao.pullOne.catch - ${err} - ${JSON.stringify(obj)}`)
        return err
    })
}

exports.startDB = function(cb){
    db.onReady = function(){cb()};
}