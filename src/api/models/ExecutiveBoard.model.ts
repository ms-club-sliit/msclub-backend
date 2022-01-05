import mongoose, { Schema } from "mongoose";
import { IExecutiveBoard } from "../../interfaces/IExecutiveBoard";

const ExecutiveBoardSchema = new Schema<IExecutiveBoard>({
	year: { type: String, required: true },
	board: [{ type: mongoose.Schema.Types.ObjectId, ref: "boardmember" }],
	deletedAt: { type: Date, required: false, default: null },
	createdBy: { type: Schema.Types.ObjectId, required: true, ref: "users" },
	updatedBy: [
		{
			user: { type: Schema.Types.ObjectId, required: false, ref: "users" },
			updatedAt: { type: Date, required: false },
		},
	],
	deletedBy: {
		type: Schema.Types.ObjectId,
		required: false,
		default: null,
		ref: "users",
	},
});

const ExecutiveBoardModel = mongoose.model<IExecutiveBoard>("ececutiveboard", ExecutiveBoardSchema);

export default ExecutiveBoardModel;
