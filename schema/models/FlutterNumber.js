const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flutterNumberSchema = new Schema ({
    steps: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('FlutterNumber', flutterNumberSchema)

