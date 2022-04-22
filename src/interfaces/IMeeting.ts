import { Document, Schema } from "mongoose";
interface IMeeting extends Document {
	meetingId: string;
	meetingName: string;
	startDateTime: Date;
	endDateTime: Date;
	emailList: string[];
	sheduledLink: string;
	type: string;
	deletedAt?: null | Date | string;
	deletedBy?: Schema.Types.ObjectId | null;
}

interface IMeetingRequest extends Document {
	meetingName: string;
	startDateTime: Date;
	endDateTime: Date;
	emailList: string[];
}

export type { IMeeting, IMeetingRequest };
