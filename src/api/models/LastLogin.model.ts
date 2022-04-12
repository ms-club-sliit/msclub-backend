import mongoose, { Schema } from "mongoose";
import { ILastLoggedUser } from "../../interfaces/IUser";

const LastLoggedUserSchema = new Schema<ILastLoggedUser>(
	{
		loggedAt: { type: Date, required: true, default: null },
		user: { type: Schema.Types.ObjectId, required: true, ref: "users" },
	},
	{
		timestamps: true,
	}
);

const LastLoggedUserModel = mongoose.model<ILastLoggedUser>("loggins", LastLoggedUserSchema);
export default LastLoggedUserModel;
