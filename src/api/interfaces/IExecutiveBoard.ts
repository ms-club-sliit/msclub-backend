import { Document } from 'mongoose';
import { IBoardMember } from './IBoardMember';

interface IExecutiveBoard extends Document {
    year: string;
    board: IBoardMember[];
}
export type { IExecutiveBoard };