import mongoose, { Schema } from "mongoose";
import { IOrganization } from "../../interfaces";

const OrganizationSchema = new Schema<IOrganization>(
	{
		name: { type: String, required: true, trim: true },
		email: { type: String, required: true, trim: true },
		university: { type: String, required: true, trim: true },
		phoneNumber: { type: String, required: true, trim: true },
		address: { type: String, required: true, trim: true },
		website: { type: String, required: true, trim: true },
		imagePath: { type: String, required: true, trim: true },
		updatedBy: [
			{
				user: { type: Schema.Types.ObjectId, required: false, ref: "users" },
				updatedAt: { type: Date, required: false },
			},
		],
	},
	{
		timestamps: true,
	}
);

const OrganizationModel = mongoose.model<IOrganization>("organization", OrganizationSchema);

export default OrganizationModel;
