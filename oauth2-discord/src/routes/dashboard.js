const router = require("express").Router()

function isAuthorized(req, res, next) {
    if (req.user) {
        console.log("User is logged in.")
        next()
    } else {
        console.log("User is not logged in.")
        res.redirect("/")
    }
}

router.get("/", isAuthorized, (req, res) => {
    res.render('dashboard', {
        username: req.user.username,
        discordId: req.user.discordId,
    })
})

module.exports = router