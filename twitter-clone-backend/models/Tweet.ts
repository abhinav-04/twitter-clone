import mongoose, { Document, Schema } from 'mongoose';

export interface TweetDocument extends Document {
  text: string;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  // Add more fields as needed (e.g., images, videos, likes, etc.)
}

const tweetSchema = new Schema<TweetDocument>({
  text: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  // Add more fields as needed (e.g., images, videos, likes, etc.)
});

export default mongoose.model<TweetDocument>('Tweet', tweetSchema);
