import { Document } from 'mongoose';
import { IBoardMember } from './IBoardMember';

interface IExecutiveBoard extends Document {
    serviceTerm: string;
    boardMember: IBoardMember[];
}
export type { IExecutiveBoard };