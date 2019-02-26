const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const globalSchema = new Schema({
    userCount: Int,
    status: GlobalStatus,
    onlineVount: Int,
    platFormHealth: String,
});

module.exports = mongoose.model('Global', globalSchema);