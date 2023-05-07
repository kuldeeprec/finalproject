const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    signupEmail: {
        type: String,
        required: true,
        unique: true
    },
    district: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const User = mongoose.model('user', userSchema);
module.exports = User;