'use strict';

var _Utils = require('./biz/Utils');

var port = 9000;
var dbUtils = _Utils.Utils;

var express = require('express'); //https://www.npmjs.com/package/express
var web = express();

web.listen(port, function () {
  console.log('server is running on port ' + port);
  dbUtils.createDatabase();
});