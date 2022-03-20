import { Document } from "mongoose";
interface IMeeting extends Document {
	meetingName: string;
	startDateTime: Date;
	endDateTime: Date;
	emailList: string[];
	sheduledLink: string;
}

export type { IMeeting };
