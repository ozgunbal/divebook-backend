const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Dive = mongoose.model('Dive', {
    site: {type: String, required: true},
    meter: {type: Number, required: true},
    minute: {type: Number, required: true},
    date: {type: Date, require: true},
    note: String,
    user: Schema.Types.ObjectId,
});

module.exports = Dive;