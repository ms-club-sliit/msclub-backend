import mongoose, { Schema } from "mongoose";
import { IMeeting } from "../../interfaces";

const MeetingSchema = new Schema<IMeeting>(
	{
		meetingId: { type: String, required: true },
		meetingName: { type: String, required: true },
		startDateTime: { type: Date, required: true },
		endDateTime: { type: Date, required: true },
		emailList: [{ type: String, required: true }],
		sheduledLink: { type: String, required: true },
		deletedAt: { type: Date, required: false, default: null },
		deletedBy: {
			type: Schema.Types.ObjectId,
			required: false,
			default: null,
			ref: "users",
		},
	},
	{ timestamps: true }
);

const MeetingModel = mongoose.model<IMeeting>("meeting", MeetingSchema);

export default MeetingModel;
