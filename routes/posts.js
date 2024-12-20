const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Route to create a new post
router.post('/create', async (req, res) => {
    const { mediaUrl, description } = req.body;
    try {
        const post = new Post({ mediaUrl, description, comments: [] });
        await post.save();
        res.json({ success: true, post });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Unable to create post' });
    }
});

module.exports = router;
