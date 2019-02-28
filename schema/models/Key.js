const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const keySchema = new Schema({
    // May be multiple values in future
    kind: {
        type: String,
        required: true
    },
    value: {
        type: Object,
        required: true
    }
});

module.exports = mongoose.model('Key', keySchema);