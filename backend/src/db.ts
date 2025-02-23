import mongoose, { Schema } from 'mongoose'
<<<<<<< HEAD
import { object, string } from 'zod';
mongoose.connect('DB_URL')
=======
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined');
}

mongoose.connect(databaseUrl)
>>>>>>> bed9f90 (update: db url)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [20, 'Username must be at most 20 characters long']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    maxlength: [20, 'Password cannot exceed 20 characters'],
    validate: {
      validator: function (value: string) {
        // Check for at least one uppercase letter, one lowercase letter, one number, and one special character
        const hasUppercase = /[A-Z]/.test(value);
        const hasLowercase = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
        return hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
      },
      message: `Password must include at least one uppercase letter, one lowercase letter, one number, and one special character`,
    },
  },
});

const contentSchema = new Schema({
  title: String,
  link: String,
  type: String,
  Tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
});

const linkSchema = new Schema({
  hash: String,
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
});



export const Link = mongoose.model('Link', linkSchema);
export const User = mongoose.model('User', userSchema);
export const Content = mongoose.model('Content', contentSchema);



