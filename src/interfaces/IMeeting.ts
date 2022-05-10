import { Document, Schema } from "mongoose";

interface IUpdatedBy {
	user: Schema.Types.ObjectId;
	updatedAt: Date;
}
interface IMeeting extends Document {
	meetingId: string;
	meetingName: string;
	startDateTime: string;
	endDateTime: string;
	emailList: string[];
	scheduledLink: string;
	type: string;
	deletedAt?: null | Date | string;
	updatedBy: IUpdatedBy[];
	deletedBy?: Schema.Types.ObjectId | null;
}

interface IMeetingRequest extends Document {
	meetingName: string;
	startDateTime: Date;
	endDateTime: Date;
	emailList: string[];
}

export type { IMeeting, IMeetingRequest };
