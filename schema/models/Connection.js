const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionsSchema = new Schema({
    // ID +
    kind: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    // Maybe Implemented
    key: {
        type: Schema.Types.ObjectId,
        ref: 'Key',
        required: true,
    },
    // Info is a lightware to get anon Sample Data regarding this Query
    party: {
        type: Schema.Types.ObjectId,
        ref: 'Party',
        required: true,
    }
});

module.exports = mongoose.model('Connections', connectionsSchema);