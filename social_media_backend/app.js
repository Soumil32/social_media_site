const express = require('express');
const router = express.Router();
const {MongoClient} = require('mongodb');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const jwt = require('jsonwebtoken');
const app = express();
const uri = 'mongodb+srv://soumil:ZSAtXEzDxsReUtko@foodshoptest.ldwt5pj.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Configure CORS to allow requests from 'http://localhost:5173'
app.use(cors({
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // some legacy browsers (e.g., IE11) choke on 204
}));

function authenticateToken(req, res, next) {
    // Retrieve token from request headers
    const token = req.body.headers['Authorization'].replace('Bearer ', '');

    // Verify and decode token
    jwt.verify(token, 'social_media_demo', (err, user) => {
        if (err) {
            // Token verification failed
            console.log('error in token verification');
            return res.sendStatus(401);
        }

        // Token verification successful
        // User information is available in `user` object
        req.user = user;

        // Call next middleware or route handler
        next();
    });
}

app.post('/create-user', async (req, res) => {
    const allAccounts = client.db("social_media_demo").collection("accounts");
    const {userName, password} = req.body;
    const account = {userName, password};
    const result = await allAccounts.insertOne(account);
    // return whether the request successful or not
    result ? res.status(200).json({message: 'Account created successfully'}) : res.status(500).json({message: 'Account creation failed'});
});

// handle login request and generate auth token
app.post('/login', async (req, res) => {
    const allAccounts = client.db("social_media_demo").collection("accounts");
    const {userName, password} = req.body;
    const account = {userName, password};
    const result = await allAccounts.findOne(account);
    if (!result) { res.status(401).json({message: 'Invalid credentials'}); return }
    const payload = {userName: userName};
    const key = 'social_media_demo';
    const token = jwt.sign(payload, key, {expiresIn: '24h'});
    res.status(200).json({message: 'Login successful', token});
});

app.post('/get-posts', authenticateToken, async (req, res) => {
    console.log('fetching posts');
    const allPosts = client.db("social_media_demo").collection("posts");
    console.log('posts fetched');
    const result = await allPosts.find().toArray();
    res.status(200).json({message: 'Posts fetched successfully', posts: result});
});

app.post('/create-post', authenticateToken, async (req, res) => {
    const allPosts = client.db("social_media_demo").collection("posts");
    const {title, content} = req.body;
    const userName = req.user.userName;
    const newPost = {userName, title, content};
    const result = await allPosts.insertOne(newPost);
    result ? res.status(200).json({message: 'Post created successfully'}) : res.status(500).json({message: 'Post creation failed'});
});

module.exports = app;