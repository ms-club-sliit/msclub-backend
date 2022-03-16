import { DocumentDefinition } from "mongoose";
import { IMeeting } from "../../interfaces";
import MeetingModel from "../models/Meeting.model";
import { Request } from "express";
import axios from "axios";

export const scheduleInternalMeetingMSTeams = (request: Request, meetingData: DocumentDefinition<IMeeting>) => {
	// console.log(meetingData);
	return axios
		.post(`${process.env.MS_MEETING_MANAGER_API}/api/msteams/internalmeeting/schedule`, meetingData)
		.then(() => {
			const meetingInfo = {
				meetingName: meetingData.meetingName,
				startDateTime: meetingData.startDateTime,
				endDateTime: meetingData.endDateTime,
				emailList: [meetingData.emailList],
				sheduledLink: "sheduledLink",
			};
			MeetingModel.create(meetingInfo)
				.then((createdMeeting) => {
					return createdMeeting;
				})
				.catch((error) => {
					throw new Error(error.message);
				});
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};
