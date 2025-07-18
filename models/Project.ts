// models/Project.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
  href: string;
  techStack: string[];
}

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: [{ type: String }],
    href: { type: String },
    techStack: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model<IProject>("Project", projectSchema);
