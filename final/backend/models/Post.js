const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    poster_id: {
        type: String,
        required: true
    },
    image_file: {
        type: String
    },
    name: { type: String, required: true },
    like: [{ like_obj_id: { type: String, required: true }, date: { type: Number, default: Date.parse(new Date()) / 1000 } }],
    comment: [{ comment_id: { type: String, required: true }, date: { type: Number, default: Date.parse(new Date()) / 1000 } }],
    date: {
        type: Date,
        default: Date.now
    }
});
const Post = mongoose.model('post', postSchema);
module.exports = Post;