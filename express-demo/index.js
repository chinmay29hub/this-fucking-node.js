const express = require("express")
const Joi = require("joi")
const logger = require("./middleware/logger")
const auth = require("./middleware/auth")
const helmet = require("helmet")
const morgan = require("morgan")

const courses = require("./routes/courses")
const home = require("./routes/home")

const config = require("config")

const app = express()

app.set("view engine", "pug")
app.set("views", "./views") //default

app.use(express.json())

app.use(helmet());

app.use("/api/courses", courses)
app.use("/", home)

const debug = require("debug")("app:startup")
// const dbDebugger = require("debug")("app:db")

// console.log("Node Env is " + process.env.NODE_ENV)
// console.log("App env :" + app.get("env"))



// configuration

console.log("Application Name :" + config.get("name"))
console.log("Mail Server:" + config.get("mail.host"))
console.log("Mail Password:" + config.get("mail.password"))

if (app.get("env") === "development") {
    app.use(morgan("tiny"))
    debug("Morgan Enabled...")
}

// DB work

// dbDebugger("Connected to the database...")

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(logger)
app.use(auth)

// PORT
const port = process.env.PORT

app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})