import mongoose, { Schema } from "mongoose";
import { IExecutiveBoard } from "../interfaces/IExecutiveBoard";

const ExecutiveBoardSchema = new Schema<IExecutiveBoard>({
  serviceTerm: { type: String, required: true },
  boardMember: [
    {
        firstName: { type: String, required: true },
        middleName: { type: String, required: false },
        lastName: { type: String, required: true },
        position: { type: String, required: true },
        profileImageUrl: { type: String, required: false, default: null },
        socialMedia: [{
          name: { type: String, required: true },
          publicURL: { type: String, required: true },
        }],
    },
  ],
});

const ExecutiveBoardModel = mongoose.model<IExecutiveBoard>(
  "ececutiveboard",
  ExecutiveBoardSchema
);

export default ExecutiveBoardModel;
