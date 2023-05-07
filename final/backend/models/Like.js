const mongoose = require('mongoose');
const { Schema } = mongoose;

const likeSchema = new Schema({
    poster_id: {
        type: String,
        required: true
    },
    liker_id: {
        type: String,
        required: true,
        unique: true
    },
    post_obj_id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const Like = mongoose.model('like', likeSchema);
module.exports = Like;