const mongoose = require('mongoose');

const Dive = mongoose.model('Dive', {
    site: {type: String, required: true},
    meter: {type: Number, required: true},
    minute: {type: Number, required: true},
    date: {type: Date, require: true},
    note: String,
});

module.exports = Dive;