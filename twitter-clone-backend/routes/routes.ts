import express from 'express';
import { authenticateUser } from '../authMiddleware';
import jwt, { JwtPayload } from 'jsonwebtoken';
import Follower from '../models/Follower';
import Tweet from '../models/Tweet';

const router = express.Router();

// Route to get the timeline of tweets from followed users (requires authentication)
router.get('/timeline', authenticateUser, async (req, res) => {
  try {
    const token = req.header('x-auth-token');

    if (!token) {
      return res.status(401).json({ error: 'No token, authorization denied' });
    }

    // Decoding the token and extracting the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const userId = decoded.userId;

    // Find the users that the authenticated user is following
    const followers = await Follower.find({ follower: userId });
    const followingIds = followers.map((follower) => follower.following);

    // Include the user's own tweets in the timeline
    followingIds.push(userId);

    // Fetch tweets from the users the authenticated user is following
    const timelineTweets = await Tweet.find({ user: { $in: followingIds } })
      .sort({ createdAt: -1 }) // Sort by most recent
      .exec();

    res.status(200).json(timelineTweets);
  } catch (error) {
    res.status(500).json({ error: 'Timeline retrieval failed' });
  }
});

export default router;
