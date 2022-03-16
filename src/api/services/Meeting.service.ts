import { DocumentDefinition } from "mongoose";
import { IMeeting } from "../../interfaces";
import MeetingModel from "../models/Meeting.model";
import { Request } from "express";
import axios from "axios";

export const scheduleInternalMeetingMSTeams = (request: Request, meetingData: DocumentDefinition<IMeeting>) => {
	console.log(meetingData);
	return axios
		.post(`${process.env.MS_MEETING_MANAGER_API}/api/msteams/internalmeeting/schedule`, meetingData)
		.then(() => {
			return "meeting";
			// const meetingInfo = {
			// 	meetingName: meeting.meetingName,
			// 	startDateTime: meeting.startDateTime,
			// 	endDateTime: meeting.endDateTime,
			// 	emailList: [meeting.emailList],
			// 	sheduledLink: sheduledLink,
			// };
			// MeetingModel.create(meetingInfo)
			// 	.then((createdMeeting) => {
			// 		return createdMeeting;
			// 	})
			// 	.catch((error) => {
			// 		throw new Error(error.message);
			// 	});
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};
