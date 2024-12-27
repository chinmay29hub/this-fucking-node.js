const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    discordId: {
        type: String,
        required: false,
    },
    googleId: {
        type: String,
        required: false,
    },
    githubId: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: true
    },
    guilds: {
        type: Array,
        required: true
    },
    loginMethod: {
        type: String,
        required: true
    }
});

const DiscordUser = mongoose.model('DiscordUser', UserSchema);
module.exports = DiscordUser;