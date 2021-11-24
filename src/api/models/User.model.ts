import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { IUser } from '../interfaces';

const UserSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  middleName: { type: String, required: false },
  lastName: { type: String, required: true },
  addressLine01: { type: String, required: true },
  addressLine02: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  phoneNumber01: { type: String, required: true },
  phoneNumber02: { type: String, required: true },
  email: { type: String, required: true },
  userName: { type: String, required: false },
  password: { type: String, required: false },
  profileImageUrl: { type: String, required: false },
  description: { type: String, required: false },
  socialMedia: [{
    name: { type: String, required: true },
    publicURL: { type: String, required: true },
  }],
  tags: [{ type: String, required: false }],
  authToken: { type: String, required: false },
});

// Hash the user password
UserSchema.pre('save', async function (next) {
  let user = this as IUser;
  let password: any = user.password;

  if (!user.isModified('password')) {
    return next();
  }

  // Number of rounds hash function will execute
  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hashSync(password, salt);
  user.password = hash;
  return next();
});

UserSchema.methods.generateAuthToken = async function () {
  let user = this as IUser;
  const secret = process.env.JWT_SECRET as string;

  const authToken = jwt.sign({ _id: user._id }, secret);
  user.authToken = authToken;
  await user.save();
  return authToken;
}

const UserModel = mongoose.model<IUser>('users', UserSchema);

export default UserModel;