import { Document } from 'mongoose';

interface IApplication extends Document {
    sliitId : string;
    name : string;
    email : string
    contactNumber : string;
    currentAcademicYear : number;
    selfIntroduction : string;
    reasonForJoin : string;
    linkedIn : string;
    gitHub : string;
    blog ?: string;
    experiences : string;
    challenges : string;
    goal : string;
    skillsAndtalents : string[];
    pastWork ?: string;
    deletedAt : Date;
    status : string;
};

export type { IApplication };