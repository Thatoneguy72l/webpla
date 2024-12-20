const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    mediaUrl: String,
    description: String,
    comments: [String], // Array of comments
});

module.exports = mongoose.model('Post', PostSchema);
