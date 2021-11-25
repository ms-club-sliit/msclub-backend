import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import { IUser } from '../interfaces';

const UserSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  middleName: { type: String, required: false },
  lastName: { type: String, required: true },
  addressLine01: { type: String, required: true },
  addressLine02: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  phoneNumber01: { 
    type: String, 
    required: [true, 'Phone number 1 is required'],
    trim: true,
    max: [10, 'Phone number should have 10 numbers'],
    validate(value: string) {
      if (!validator.isMobilePhone(value)) {
        throw new Error('Phone number 1 is not valid');
      }
    } 
  },
  phoneNumber02: {
    type: String, 
    required: false,
    trim: true,
    max: [10, 'Phone number should have 10 numbers'],
    validate(value: string) {
      if (!validator.isMobilePhone(value) && value.length > 0) {
        throw new Error('Phone number 2 is not valid');
      }
    } 
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    trim: true,
    unique: true,
    validate(value: string) {
      if (!validator.isEmail(value)) {
        throw new Error('Email address is not valid');
      }
    }
  },
  userName: { type: String, required: false, default: null, unique: true },
  password: { type: String, required: false },
  profileImageUrl: { type: String, required: false, default: null },
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