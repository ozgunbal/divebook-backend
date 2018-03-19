const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
    email: {type: String, required: true},
    password : {type: String, required: true}
});

userSchema.methods.generateHash = (password) => (
    bcrypt.hashSync(password, bcrypt.genSaltSync(), null)
);
// arrow function changes scope of this
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
};

const User = mongoose.model('User', userSchema);

module.exports = User;