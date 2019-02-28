const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const statSchema = new Schema({
    // AA Restructure Day in a better way to reach to Stats
    day: {
        type: String,
        required: true
    },
    // Name has the following sample set
    // Tracked: Calories, Steps, Sleep Cycle, Heart Rate
    // Clinical: 
    // Diet: Name of item | Slice of Ate
    name: {
        type: String,
        required: true,
    },
    // Description takes the values: Tracked, Clinical & Diet
    description: {
        type: String,
        required: true,
    },
    // Value of the Named
    value: {
        type: Number,
        required: true,
    },
    holder: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Stat', statSchema);