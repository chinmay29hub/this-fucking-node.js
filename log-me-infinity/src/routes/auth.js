const router = require("express").Router()
const passport = require("passport")

router.get("/discord", passport.authenticate("discord"))

router.get("/discord/redirect", passport.authenticate("discord", {
    failureRedirect: "/forbidden",
    successRedirect: "/dashboard"
}))

router.get("/google", passport.authenticate("google", { scope: ['profile', 'email'] }));

router.get("/google/redirect", passport.authenticate("google", {
    failureRedirect: "/forbidden",
    successRedirect: "/dashboard"
}));

router.get("/github", passport.authenticate("github", { scope: ['user:email'] }));

router.get("/github/redirect", passport.authenticate("github", {
    failureRedirect: "/forbidden",
    successRedirect: "/dashboard"
}));

router.get("/logout", (req, res, next) => {
    if (req.user) {
        req.logout(err => {
            if (err) {
                return next(err)
            }
            res.redirect("/")
        });
    } else {
        res.redirect("/")
    }
});


module.exports = router