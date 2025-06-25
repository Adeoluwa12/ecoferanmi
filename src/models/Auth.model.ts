import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IAuth extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'author' | 'subscriber';
  comparePassword(candidate: string): Promise<boolean>;
}

const authSchema = new mongoose.Schema<IAuth>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'author', 'subscriber'], default: 'subscriber' },
  },
  { timestamps: true }
);

// Hash password before saving
authSchema.pre('save', async function (next) {
  const user = this as IAuth;
  if (!user.isModified('password')) return next();

  try {
    user.password = await bcrypt.hash(user.password, 10);
    next();
  } catch (err) {
    // Fix: ensure err is of type CallbackError | undefined
    next(err as mongoose.CallbackError);
  }
});
authSchema.methods.comparePassword = async function (candidate: string): Promise<boolean> {
  return await bcrypt.compare(candidate, this.password);
};

export default mongoose.model<IAuth>('Auth', authSchema);
