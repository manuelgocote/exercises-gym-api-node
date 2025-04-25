import mongoose, { Schema, Document } from "mongoose";

export interface UserDocument extends Document {
  username: string;
  password: string;
  email: string;
  role: 'user' | 'admin';
}

const userSchema = new Schema<UserDocument>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ['user', 'admin'] },
});

export const UserModel = mongoose.model<UserDocument>("User", userSchema);
