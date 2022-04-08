import { Document, Schema } from "mongoose";
interface IMeeting extends Document {
	meetingName: string;
	startDateTime: Date;
	endDateTime: Date;
	emailList: string[];
	sheduledLink: string;
	deletedAt?: null | Date | string;
	deletedBy?: Schema.Types.ObjectId | null;
}

export type { IMeeting };
