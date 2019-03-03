const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guildSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    members: [
        {
            type: String,
            required: true,
        }
    ],
    nom: {
        type: Number,
        required: true
    },
    challenges: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Challenge'
        }
    ]
})

module.exports = mongoose.model('Guild', guildSchema);