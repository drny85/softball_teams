const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    lastName: {
        type: String,
        required: true,
        lowercase: true
    },
    role: {
        type: String,
        default: 'manager'
    },
    email: {
        type: String,
        lowercase: true,
        trim: true
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id,
        role: this.role,
        email: this.email
    }, process.env.MY_JWT_PRIVATE_KEY);

    return token;
}



module.exports = mongoose.model('User', userSchema)