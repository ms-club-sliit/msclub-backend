import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { IUserModel, IUser } from "../../interfaces";
import validator from "validator";

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber01: {
      type: String,
      required: [true, "Phone number 1 is required"],
      trim: true,
      max: [10, "Phone number should have 10 numbers"],
      validate(value: string) {
        if (!validator.isMobilePhone(value)) {
          throw new Error("Phone number 1 is not valid");
        }
      },
    },
    phoneNumber02: {
      type: String,
      required: false,
      trim: true,
      max: [10, "Phone number should have 10 numbers"],
      validate(value: string) {
        if (!validator.isMobilePhone(value) && value.length > 0) {
          throw new Error("Phone number 2 is not valid");
        }
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error("Email address is not valid");
        }
      },
    },
    userName: { type: String, required: false, unique: true },
    password: { type: String, required: false },
    profileImage: { type: String, required: false, default: null },
    authToken: { type: String, required: false },
    permissionLevel: {
      type: String,
      required: true,
      enum: ["ROOT_ADMIN", "ADMIN", "EDITOR", "VIEWER"],
      default: "EDITOR",
    },
    deletedAt: { type: Date, required: false, default: null },
    deletedBy: { type: Schema.Types.ObjectId, required: false, default: null },
  },
  {
    timestamps: true,
  }
);

// Hash the user password
UserSchema.pre("save", async function (next) {
  let user = this as IUser;
  let password: any = user.password;

  if (!user.isModified("password")) {
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
};

UserSchema.statics.findByUsernamePassword = async (userName: string, password: string): Promise<IUser> => {
  const user = await UserModel.findOne({ userName: userName });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password as string);

  if (!isPasswordMatch) {
    throw new Error("Password is incorrect");
  }

  return user;
};

const UserModel = mongoose.model<IUser, IUserModel>("users", UserSchema);

export default UserModel;
