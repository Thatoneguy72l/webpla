const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Route to add a comment to a post
router.post('/add/:postId', async (req, res) => {
    const postId = req.params.postId;
    const { comment } = req.body;

    try {
        const post = await Post.findById(postId);
        if (post) {
            post.comments.push(comment);
            await post.save();
            res.json({ success: true, post });
        } else {
            res.status(404).json({ success: false, error: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Unable to add comment' });
    }
});

module.exports = router;
