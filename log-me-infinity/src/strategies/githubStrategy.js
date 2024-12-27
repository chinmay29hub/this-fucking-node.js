const GitHubStrategy = require('passport-github').Strategy;
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

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_REDIRECT_URI
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await DiscordUser.findOne({ githubId: profile.id });
        if (user) {
            done(null, user);
        } else {
            const newUser = await DiscordUser.create({
                githubId: profile.id,
                username: profile.username,
                guilds: profile.emails,
                loginMethod: 'github'
            });
            const savedUser = await newUser.save();
            done(null, savedUser);
        }
    } catch (err) {
        console.log(err);
        done(err, null);
    }
}));