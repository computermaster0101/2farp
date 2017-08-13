const tinydb = require('tinydb');
const db = new tinydb('./2farp.db');

exports.startDB = function(cb){
    db.onReady = function(){cb()};
}

exports.pullOne = function(obj){
    return new Promise((resolve,reject) => {
        db.find(obj,function(err,results){
            if(err){
                obj.error = `item not in database`
                reject(obj);
            }else{
                resolve(results[0])
            }
        })
    })
}

// https://gist.github.com/justmoon/15511f92e5216fa2624b
//
// https://ponyfoo.com/articles/es6-promises-in-depth

exports.createOne = function(obj){
    return new Promise((resolve,reject) => {
        db.appendItem(obj,function(){
            db.flush(function(){
                db.find(obj,function(err,results){
                    if(err){
                        let result = obj
                        result.error = `failed to create item in database`
                        reject(result)
                    }else{
                        console.log(`dao.create - ${JSON.stringify(result)}`)
                        let result = results[0];
                        resolve(result._id)
                    }
                })
            })
        })
    }).catch((error) => {
        console.log(`dao.createOne - ${JSON.stringify(error)} - ${error.error}`)
        return error
    })
}
exports.getById = function(id){
    return new Promise((resolve,reject) => {
        db.findById(id,function(err,result){
            if(err){
                let result = obj
                result.error = `failed to create item in database`
                reject(result)
            }else{
                resolve(result)
            }
        })
    }).catch((error) => {
        console.log(`dao.create - ${JSON.stringify(obj)} - ${error.error}`)
        return error
    })
}
