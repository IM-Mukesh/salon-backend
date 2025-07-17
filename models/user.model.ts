import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  picture?: string;
  role: "salon";
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    picture: String,
    role: { type: String, enum: ["salon"], default: "salon" },
  },
  { timestamps: true }
);

// ✅ Avoid model overwrite errors in development/Vercel
export default mongoose.models.User ||
  mongoose.model<IUser>("User", userSchema);
