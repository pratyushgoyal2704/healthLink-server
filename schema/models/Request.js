const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requestSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    kind: {
        type: String,
        required: true
    },
    party: {
        type: Schema.Types.ObjectId,
        ref: 'Party',
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Request', requestSchema);