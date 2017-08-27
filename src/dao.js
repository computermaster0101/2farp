const tinydb = require('tinydb'); //https://www.npmjs.com/package/tinydb
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

exports.removeOne = function(obj){
    return new Promise((resolve,reject) => {
        db.find(obj,function(err,results){
            if(err){
                resolve()
            }else{
                db.findByIdAndRemove(results[0]._id,function(){
                    db.flush(function(){
                        resolve()
                    })
                })
            }
        })
    })
}
exports.createOne = function(obj){
    return new Promise((resolve,reject) => {
        db.appendItem(obj,function(){
            db.flush(function(){
                db.find(obj,function(err,results){
                    if(err){
                        obj.error = `failed to create item in database`
                        reject(obj)
                    }else{
                        let result = results[0];
                        resolve(result._id)
                    }
                })
            })
        })
    })
}
exports.getById = function(id){
    return new Promise((resolve,reject) => {
        db.findById(id,function(err,result){
            if(err){
                obj.error = `item not in database`
                reject(obj)
            }else{
                resolve(result)
            }
        })
    })
}

exports.update = function(obj){
    return new Promise((resolve,reject) => {
        db.flush()
    })
}
// https://gist.github.com/justmoon/15511f92e5216fa2624b
//
// https://ponyfoo.com/articles/es6-promises-in-depth
