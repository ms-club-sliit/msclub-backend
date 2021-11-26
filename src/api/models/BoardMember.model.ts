import mongoose, { Schema } from 'mongoose';
import { IBoardMember } from '../interfaces/IBoardMember';

const BoardMemberSchema = new Schema<IBoardMember>({
  firstName: { type: String, required: true },
  middleName: { type: String, required: false },
  lastName: { type: String, required: true },
  position: { type: String, required: true },
  profileImageUrl: { type: String, required: false, default: null },
  socialMedia: [{
    name: { type: String, required: true },
    publicURL: { type: String, required: true },
  }],
});

const BoardMemberModel = mongoose.model<IBoardMember>('boardmember', BoardMemberSchema);

export default BoardMemberModel;