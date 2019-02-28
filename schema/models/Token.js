const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    kind: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Token', tokenSchema)