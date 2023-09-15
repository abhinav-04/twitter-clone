import mongoose, { Document, Schema } from 'mongoose';

export interface UserDocument extends Document {
  username: string;
  password: string;
  // Add more fields as needed (e.g., name, email, profile image URL, etc.)
}

const userSchema = new Schema<UserDocument>({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  // Add more fields as needed (e.g., name, email, profile image URL, etc.)
});

export default mongoose.model<UserDocument>('User', userSchema);
