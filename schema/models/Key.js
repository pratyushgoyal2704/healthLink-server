const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const keySchema = new Schema({
    // May be multiple values in future
    val: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Key', keySchema);