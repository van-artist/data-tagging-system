import mongoose, { Document, Schema } from 'mongoose';

interface Tag extends Document {
  batch: string;
  id: number;
  description: string;
  createdAt: Date;
  image_paths: string[];
  tagged_type?: string;
}

const tagSchema = new Schema<Tag>({
  id: { type: Number, required: true },
  batch: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  image_paths: { type: [String], default: [], required: true },
  tagged_type: { type: String },
});

const TagModel = mongoose.model<Tag>('Tag', tagSchema);

export default TagModel;
