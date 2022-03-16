import mongoose, { Schema } from "mongoose";
import { IMeeting } from "../../interfaces";

const MeetingSchema = new Schema<IMeeting>(
	{
		meetingName: { type: String, required: true },
		startDateTime: { type: Date, required: true },
		endDateTime: { type: Date, required: true },
		emailList: [{ type: String, required: true }],
		sheduledLink: { type: String, required: true },
	},
	{ timestamps: true }
);

const MeetingModel = mongoose.model<IMeeting>("meeting", MeetingSchema);

export default MeetingModel;
