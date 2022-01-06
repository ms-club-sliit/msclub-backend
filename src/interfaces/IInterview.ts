import { Document } from "mongoose";

interface IInterview extends Document {
	date: string;
	time: string;
	duration: string;
	format: string;
}

export type { IInterview };
