require("dotenv").config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 10000
const session = require("express-session")
const passport = require("passport")
const discordStrategy = require("./strategies/discordstrategy")
const googleStrategy = require("./strategies/googleStrategy");
const githubStrategy = require("./strategies/githubStrategy");
const db = require("./database/database")
const path = require("path")

db.then(() => console.log("Connected to MongoDB")).catch(err => 
    console.log(err)
)

const authRoute = require("./routes/auth")
const dashboardRoute = require("./routes/dashboard")

app.use(session({
    secret: "some random secret",
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    saveUninitialized: false,
    name: "discord.oauth2",
}))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.static(path.join(__dirname, "public")))

app.use(passport.initialize())
app.use(passport.session())

app.use("/auth", authRoute)
app.use("/dashboard", dashboardRoute)

app.get("/",isAuthorized, (req, res) => {
    res.render("home", {
        users: [
            { name: "User 1", email: "user1@gmail.com" },
            { name: "User 2", email: "user2@gmail.com" },
            { name: "User 3", email: "user3@gmail.com" }
        ]
    })
})

function isAuthorized(req, res, next) {
    if (req.user) {
        console.log("User is logged in.")
        res.redirect("/dashboard")
    } else {
        console.log("User is not logged in.")
        next()
    }
}

app.listen(PORT, () => {
    console.log(`Server is now listening on Port : ${PORT}`)
})