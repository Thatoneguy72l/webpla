const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Setup file upload
const upload = multer({ dest: 'uploads/' });

// Middleware
app.use(express.static('public'));  // Serve static files from 'public' directory
app.use(bodyParser.json());  // Parse incoming JSON requests

// In-memory database (for demo purposes, replace with a real database)
let posts = [];

// Route to handle media upload
app.post('/upload', upload.single('mediaFile'), (req, res) => {
    const { description } = req.body;
    const file = req.file;

    if (file && description) {
        const post = {
            id: posts.length + 1,
            mediaUrl: `/uploads/${file.filename}`,  // URL to access the uploaded media
            description: description,
            comments: []
        };
        posts.push(post);  // Add new post to the posts array
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Route to get all posts
app.get('/get-posts', (req, res) => {
    res.json(posts);  // Return all posts (including media URL, description, and comments)
});

// Route to add a comment to a specific post
app.post('/add-comment/:postId', (req, res) => {
    const postId = parseInt(req.params.postId);  // Get post ID from URL
    const comment = req.body.comment;  // Get the comment from the request body

    const post = posts.find(p => p.id === postId);  // Find the post by ID
    if (post && comment) {
        post.comments.push(comment);  // Add the comment to the post's comments array
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Serve the app
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


