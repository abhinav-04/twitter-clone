import express from 'express';
import mongoose from 'mongoose';
import Tweet, { TweetDocument } from './models/Tweet';
import bodyParser, { json } from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import Follower, {FollowerDocument} from './models/Follower';
import bcrypt from 'bcrypt';
import User, { UserDocument } from './models/User';
import { authenticateUser } from './authMiddleware';
import jwt, { JwtPayload } from 'jsonwebtoken';
import routes from './routes/routes';


dotenv.config();

const app = express();

// Middleware
app.use(json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI!, { dbName:'twitter'})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

  app.use('/api', routes);

  
  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });