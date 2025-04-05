import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      // required: true,
      max: 50,
    },
    phone: {
      type: String,
      max: 15,
    },
    role: {
      type: String,
      enum: ['seeker', 'admin', 'superadmin', 'content-manager'],
      default: 'seeker',
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  { timestamps: true },
);

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 50,
    },
    description: {
      type: String,
      required: true,
      min: 3,
    },
    image: {
      type: String,
      default: '',
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users', // Reference to the User model
      required: true,
    },
    category: {
      type: String,
    },
    price: {
      type: String,
      required: true,
      default: 0,
    },
    duration: {
      type: String,
      default: '1 month',
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    lastUpdate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export const CourseSch =
  mongoose.models.Courses || mongoose.model('Courses', courseSchema);
export const UserSch =
  mongoose.models.Users || mongoose.model('Users', userSchema);
