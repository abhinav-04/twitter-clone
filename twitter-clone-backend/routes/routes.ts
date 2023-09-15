import express from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import Follower from '../models/Follower';
import bcrypt from 'bcrypt';
import Tweet from '../models/Tweet';
import User, { UserDocument } from '../models/User';

const router = express.Router();

// routes.ts

// Route to register a new user and return a JWT token
router.post('/register', async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword });
      await user.save();
  
      // Generate and return a JWT token upon successful registration
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
      res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
      res.status(500).json({ error: 'Registration failed' });
    }
  });
  
  router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user: UserDocument | null = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ error: 'Authentication failed' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Authentication failed' });
      }
  
      // Generate and return a JWT token upon successful login
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  });

// Route to follow a user
router.post('/follow', async (req, res) => {
    try {
      const { followingId } = req.body;
      const token = req.header('x-auth-token');
  
      if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      const followerId = decoded.userId;
  
      const follower = new Follower({ follower: followerId, following: followingId });
      await follower.save();
  
      res.status(201).json({ message: 'User followed successfully' });
    } catch (error) {
      res.status(500).json({ error: 'User follow failed' });
    }
  });

  router.post('/unfollow', async (req, res) => {
    try {
      const { followingId } = req.body;
      const token = req.header('x-auth-token');
  
      if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      const followerId = decoded.userId;
  
      await Follower.findOneAndDelete({ follower: followerId, following: followingId });
  
      res.status(200).json({ message: 'User unfollowed successfully' });
    } catch (error) {
      res.status(500).json({ error: 'User unfollow failed' });
    }
  });

  // Route to create a new tweet
router.post('/tweets', async (req, res) => {
    try {
      const { text } = req.body;
      const token = req.header('x-auth-token');
  
      if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      const userId = decoded.userId;
      
  
      const tweet = new Tweet({ text, user: userId });
      await tweet.save();
  
      res.status(201).json({ message: 'Tweet created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Tweet creation failed' });
    }
  });

// Route to get the timeline of tweets from followed users
// Route to get the timeline of tweets from followed users
router.get('/timeline', async (req, res) => {
    try {
      const token = req.header('x-auth-token');
  
      if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      const userId = decoded.userId;
  
      // Find the users that the authenticated user is following
      const followers = await Follower.find({ follower: userId });
      const followingIds = followers.map((follower) => follower.following);
  
      // Include the user's own tweets in the timeline
      followingIds.push(userId);
  
      // Fetch tweets from the users the authenticated user is following
      const timelineTweets = await Tweet.aggregate([
        {
          $match: { user: { $in: followingIds } },
        },
        {
          $lookup: {
            from: 'users', // Use the name of your User collection
            localField: 'user',
            foreignField: '_id',
            as: 'userDetails',
          },
        },
        {
          $sort: { createdAt: -1 },
        },
      ]);
  
      res.status(200).json(timelineTweets);
    } catch (error) {
      res.status(500).json({ error: 'Timeline retrieval failed' });
    }
  });
  

export default router;
