
export default class Logger {

  static error = function(msg){
    console.log(`lvl: error, pid: ${process.pid}, msg: ${msg}`)
  }

  static info = function(msg){
    console.log(`lvl: info, pid: ${process.pid}, msg: ${msg}`)
  }

  static warn = function(msg){
    console.log(`lvl: warn, pid: ${process.pid}, msg: ${msg}`)
  }

  static debug = function(msg){
    console.log(`lvl: debug, pid: ${process.pid}, msg: ${msg}`)
  }

}