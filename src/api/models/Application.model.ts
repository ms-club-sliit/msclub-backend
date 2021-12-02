import mongoose, { Schema } from "mongoose";
import { IApplication } from "../interfaces";

const ApplicationSchema = new Schema<IApplication>(
  {
    studentId : { type: String, required: true},
    name : { type: String, required: true},
    email : { type: String, required: true},
    contactNumber : { type: String, required: true},
    currentAcademicYear : { type: Number, required: true},
    selfIntroduction : { type: String, required: true},
    reasonForJoin : { type: String, required: true},
    linkedIn : { type: String, required: true},
    gitHub : { type: String, required: true},
    blog : { type: String, required: false},
    experiences : { type: String, required: true},
    challenges : { type: String, required: true},
    goal : { type: String, required: true},
    //skillsAndTalents : [{ type: String, required: true}],
    pastWork : { type: String, required: false},
    deletedAt: { type: Date, required: false, default: null },
    status : { 
      type: String, 
      enum: ["PENDING", "REVIEWING", "INTERVIEW", "SELECTED", "REJECTED"], 
      required: false,
      default: "PENDING"
    },
  },
  { timestamps: true }
);

const ApplicationModel = mongoose.model<IApplication>("application", ApplicationSchema);

export default ApplicationModel;
