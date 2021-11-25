import { Document } from "mongoose";

interface IWebinar extends Document {
    webinarName: string;
    description: string;
    imageURL: string;
    dateTime: Date;
    time: Date;
    tags?: string[];
    link?: string;
    isDeleted: boolean;
};

export type { IWebinar };