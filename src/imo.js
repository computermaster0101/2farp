const tinydb = require('tinydb');
const db = new tinydb('./2farp.imo');

exports.startDB = function(cb){
    db.onReady = function(){cb()};
}

function createOne(obj){}