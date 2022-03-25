import mongoose, { Schema } from "mongoose";
import { ILastLoggedUser } from "../../interfaces/IUser";

const LastLoggedUserSchema = new Schema<ILastLoggedUser>(
	{
		loggedAt: { type: Date, required: true },
		userId: { type: Schema.Types.ObjectId, required: true, ref: "users" },
	},
	{
		timestamps: true,
	}
);

const LastLoggedUserModel = mongoose.model<ILastLoggedUser>("userLastLoginDetails", LastLoggedUserSchema);
export default LastLoggedUserModel;
