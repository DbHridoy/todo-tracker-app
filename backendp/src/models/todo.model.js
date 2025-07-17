import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Todo', todoSchema);
