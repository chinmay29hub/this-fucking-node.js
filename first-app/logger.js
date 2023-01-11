const url = "http://mylogger.io/log"
const EventEmitter = require('node:events')
// const emitter = new EventEmitter()

class Logger extends EventEmitter{
    log(message) {
        // send an http request
        console.log(message)
        this.emit("Logging", {
            id : 1,
            data : "Hello world"
        })
    }
}

module.exports = Logger
// module.exports.endPoint = url