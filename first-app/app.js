// const hello = (name) => {
//     console.log(`Hello ${name}`) // global object
// }

// hello("Chinmay")
// console.log(window)

// const log = require("./logger")

// // console.log(logger)
// log("Hello There!!")

// const path = require("node:path")
// const pathObg = path.parse(__filename)
// console.log(pathObg)

// const os = require('node:os')

// const a = os.totalmem()
// const b = os.freemem()

// console.log(`Total memory ${a}`)
// console.log(`Free memory ${b}`)

// const fs = require("node:fs")

// // console.log(fs.readdirSync("./"))
// fs.readdir("$", function (err, files) {
//     if(err) {
//         console.log("Error :" + err)
//     } else {
//         console.log("Result : " + files)
//     }
// })

// const EventEmitter = require('node:events')

// emitter.addListener("Message logged", (arg) => {
//     console.log("Listener Called", arg)
// })
// emitter.emit("Message logged", {
//     id : 1,
//     url : "URL://"
// }) // Making a noise or signaling


// const Logger = require("./logger")
// const logger = new Logger()

// logger.addListener("Logging", (arg) => {
//     console.log(arg)
// })


// logger.log("Hello World")

const { Socket } = require("node:dgram")
const { request } = require("node:http")
const http = require("node:http")

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.write("Hello World")
        res.end()
    }

    if (req.url === "/api/courses") {
        res.write(JSON.stringify([1,2,3,4,5]))
        res.end()
    }
})



server.listen(4000)

console.log("Listening on port 4000..")



