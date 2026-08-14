import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
      maxlength: 255,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 5000,
    },
    status: {
      type: String,
      enum: ['pending', 'resolved'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

export const Contact = mongoose.model('Contact', contactSchema);
