import { Document, Schema } from "mongoose";
import { IBoardMember } from "./IBoardMember";

interface IUpdatedBy {
	user: Schema.Types.ObjectId;
	updatedAt: Date;
}

interface IExecutiveBoard extends Document {
	year: string;
	board: IBoardMember[];
	deletedAt?: Date;
	createdBy: Schema.Types.ObjectId;
	updatedBy: IUpdatedBy[];
	deletedBy?: Schema.Types.ObjectId;
}
export type { IExecutiveBoard };
