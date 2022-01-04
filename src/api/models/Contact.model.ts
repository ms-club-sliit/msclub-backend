import mongoose, { Schema } from "mongoose";
import validator from "validator";
import { IContact } from "../../interfaces";

const ContactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error("Email address is not valid");
        }
      },
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
    deletedAt: { type: Date, required: false, default: null },
  },
  {
    timestamps: true,
  }
);

const ContactModel = mongoose.model<IContact>("contacts", ContactSchema);

export default ContactModel;
