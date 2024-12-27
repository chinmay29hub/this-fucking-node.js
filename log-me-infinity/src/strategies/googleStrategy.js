const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const DiscordUser = require('../models/DiscordUser');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await DiscordUser.findById(id);
    if (user) {
        done(null, user);
    }
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_REDIRECT_URI
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await DiscordUser.findOne({ googleId: profile.id });
        if (user) {
            done(null, user);
        } else {
            const newUser = await DiscordUser.create({
                googleId: profile.id,
                username: profile.displayName,
                guilds: profile.emails,
                loginMethod: 'google'
            });
            const savedUser = await newUser.save();
            done(null, savedUser);
        }
    } catch (err) {
        console.log(err);
        done(err, null);
    }
}));