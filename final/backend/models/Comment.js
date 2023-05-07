const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    comment_by: {
        type: String,
        required: true
    },
    post_id: {
        type: String,
        required: true
    },
    post_obj_id: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const Comment = mongoose.model('comment', commentSchema);
module.exports = Comment;