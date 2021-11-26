import mongoose, { Schema } from "mongoose";
import { IExecutiveBoard } from "../interfaces/IExecutiveBoard";

const ExecutiveBoardSchema = new Schema<IExecutiveBoard>({
  year: { type: String, required: true },
  board: [
    {
      name: { type: String, required: true },
      position: { type: String, required: true },
      image: { type: String, required: false, default: null },
      socialMedia: {
        facebook: { type: String, required: true },
        linkedin: { type: String, required: true },
        instagram: { type: String, required: true },
        twitter: { type: String, required: true },
      },
    },
  ],
});

const ExecutiveBoardModel = mongoose.model<IExecutiveBoard>(
  "ececutiveboard",
  ExecutiveBoardSchema
);

export default ExecutiveBoardModel;
