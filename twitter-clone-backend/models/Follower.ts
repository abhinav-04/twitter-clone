import mongoose, { Document, Schema } from 'mongoose';

export interface FollowerDocument extends Document {
  follower: mongoose.Types.ObjectId;
  following: mongoose.Types.ObjectId;
}

const followerSchema = new Schema<FollowerDocument>({
  follower: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  following: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model<FollowerDocument>('Follower', followerSchema);
