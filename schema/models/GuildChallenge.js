const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guildChallengeSchema = new Schema({
    guildName: {
        type: String,
        required: true
    },
    mission: {
        type: String,
        required: true,
    },
    kind: {
        type: String,
        required: true,
    },
    holderNames: [
        {
            type: String,
            required: true,
        }
    ],
    holderIDs: [
        {
            type: String,
            required: false,
        }
    ]
});

module.exports = mongoose.model('GuildChallenge', guildChallengeSchema);