const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hideOptions = function(doc, obj) {
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
    delete obj.user;
    return obj;
}

const Dive = mongoose.model('Dive', new Schema({
    site: {type: String, required: true},
    meter: {type: Number, required: true},
    minute: {type: Number, required: true},
    date: {type: Date, require: true},
    note: String,
    user: {type: Schema.Types.ObjectId, select: false},
}, {
    toObject: {
        transform: hideOptions
    }
}));

module.exports = Dive;