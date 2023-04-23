const express = require('express');
const bcrypt = require('bcrypt');
require('dotenv').config();
const {MongoClient} = require('mongodb');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const jwt = require('jsonwebtoken');
const app = express();
const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// Configure CORS to allow requests from 'http://localhost:5173'
app.use(cors({
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // some legacy browsers (e.g., IE11) choke on 204
}));

function authenticateToken(req, res, next) {
    let token;
    try {
        // Retrieve token from request headers
        token = req.body.headers['Authorization'].replace('Bearer ', '');
    } catch (error) {
        // Token not found
        console.log(error);
        return res.status(401).json({message: 'Token not found'});
    }

    if (!token) {
        // Token not found
        return res.status(401).json({message: 'Token not found'});
    }

    // Verify and decode token
    jwt.verify(token, process.env.LOGIN_TOKEN_KEY, (err, user) => {
        if (err) {
            // Token verification failed
            console.log('error in token verification');
            return res.status(403).json({message: 'Invalid token. Please login again'});
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
    // Hash the password
    const saltRounds = 10;
    console.log('before hash', password)
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('after hash', hashedPassword)
    const account = {userName, password: hashedPassword};
    const result = await allAccounts.insertOne(account);
    // return whether the request successful or not
    result ? res.status(200).json({message: 'Account created successfully'}) : res.status(500).json({message: 'Account creation failed'});
});

// handle login request and generate auth token
app.post('/login', async (req, res) => {
    const allAccounts = client.db("social_media_demo").collection("accounts");
    const {userName, password} = req.body;
    const hashedPassword = (await allAccounts.findOne({userName: userName})).password;
    bcrypt.compare(password, hashedPassword).then((result) => {
        console.log(result);
        if (!result) { res.status(401).json({message: 'Invalid credentials'});}
    }).catch((error) => {
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
    });
    const payload = {userName: userName};
    const token = jwt.sign(payload, process.env.LOGIN_TOKEN_KEY, {expiresIn: '24h'});
    res.status(200).json({message: 'Login successful', token});
});

app.post('/get-posts', authenticateToken, async (req, res) => {
    const allPosts = client.db("social_media_demo").collection("posts");
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

app.post('/validate-token', authenticateToken, (req, res) => {
    res.status(200).json({message: 'Token valid'});
});

app.get('/verify-server', (req, res) => {
    res.status(200).json({message: 'Server is up and running'});
}); // this is to verify that the server is up and running
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port ${process.env.PORT || 3000}`);
});

module.exports = app;