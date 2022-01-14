import { Document } from "mongoose";

interface IInterview extends Document {
	format: string;
	startDateTime: Date;
	endDateTime: Date;
	attendees: any;
}

export type { IInterview };
