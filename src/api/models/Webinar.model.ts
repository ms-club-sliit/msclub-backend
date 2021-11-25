import mongoose, { Schema } from "mongoose";
import { IWebinar } from "../interfaces/IWebinar";

const WebinarSchema = new Schema<IWebinar>(
    {
        webinarName: { type: String, required: true },
        description: { type: String, required: true },
        imageURL: { type: String, required: true },
        dateTime: { type: Date, required: true },
        time: { type: Date, required: true },
        tags: [{ type: String, required: false }],
        link: { type: String, required: true },
        isDeleted: { type: Boolean, required: true },
    },
    { timestamps: true }
);

const WebinarModel = mongoose.model<IWebinar>("webinar", WebinarSchema);

export default WebinarModel;