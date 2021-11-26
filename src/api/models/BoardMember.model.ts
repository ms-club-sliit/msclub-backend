import mongoose, { Schema } from 'mongoose';
import { IBoardMember } from '../interfaces/IBoardMember';

const BoardMemberSchema = new Schema<IBoardMember>({
  name: { type: String, required: true },
  position: { type: String, required: true },
  image: { type: String, required: false, default: null },
  socialMedia: {
    facebook: { type: String, required: true },
    linkedin: { type: String, required: true },
    instagram: { type: String, required: true },
    twitter: { type: String, required: true },
  },
});

const BoardMemberModel = mongoose.model<IBoardMember>('boardmember', BoardMemberSchema);

export default BoardMemberModel;