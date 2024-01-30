// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const commentsByPostId = {};

// Get all comments for a post
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

// Add a new comment for a post
app.post('/posts/:id/comments', (req, res) => {
    // Create a random id for the comment
    const commentId = randomBytes(4).toString('hex');
    // Get the comment text from the request body
    const { content } = req.body;
    // Get the list of comments for the post
    const comments = commentsByPostId[req.params.id] || [];
    // Push the new comment to the list
    comments.push({ id: commentId, content });
    // Save the list of comments for the post
    commentsByPostId[req.params.id] = comments;
    // Return the list of comments
    res.status(201).send(comments);
});

// Start the server
app.listen(4001, () => {
    console.log('Listening on 4001');
});