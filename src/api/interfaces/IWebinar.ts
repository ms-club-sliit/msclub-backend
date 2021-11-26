import { Document } from "mongoose";

interface IWebinar extends Document {
    title: string;
    description: string;
    imageUrl: string;
    dateTime: Date;
    time: Date;
    tags?: string[];
    link?: string;
    deletedAt?: Date;
};

export type { IWebinar };