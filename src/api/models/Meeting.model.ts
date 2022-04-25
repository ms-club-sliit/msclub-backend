import mongoose, { Schema } from "mongoose";
import { IMeeting } from "../../interfaces";

const MeetingSchema = new Schema<IMeeting>(
	{
		meetingId: { type: String, required: true },
		meetingName: { type: String, required: true },
		startDateTime: { type: String, required: true },
		endDateTime: { type: String, required: true },
		emailList: [{ type: String, required: true }],
		sheduledLink: { type: String, required: true },
		type: {
			type: String,
			enum: ["INTERNAL", "INTERVIEW"],
			required: true,
		},
		deletedAt: { type: Date, required: false, default: null },
		deletedBy: {
			type: Schema.Types.ObjectId,
			required: false,
			default: null,
			ref: "users",
		},
		updatedBy: [
			{
				user: { type: Schema.Types.ObjectId, required: false, ref: "users" },
				updatedAt: { type: Date, required: false },
			},
		],
	},
	{ timestamps: true }
);

const MeetingModel = mongoose.model<IMeeting>("meeting", MeetingSchema);

export default MeetingModel;
