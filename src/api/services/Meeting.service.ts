import { DocumentDefinition } from "mongoose";
import { IMeeting } from "../../interfaces";
import MeetingModel from "../models/Meeting.model";
import { Request } from "express";
import axios from "axios";

export const scheduleInternalMeetingMSTeams = (request: Request, meetingData: DocumentDefinition<IMeeting>) => {
	return axios
		.post(`${process.env.MS_MEETING_MANAGER_API}/api/msteams/internalmeeting/schedule`, meetingData)
		.then((sceduleMeeting) => {
			const meetingInfo = {
				meetingName: meetingData.meetingName,
				startDateTime: meetingData.startDateTime,
				endDateTime: meetingData.endDateTime,
				emailList: [meetingData.emailList],
				sheduledLink: sceduleMeeting.data.body.onlineMeeting.joinUrl,
			};
			return MeetingModel.create(meetingInfo)
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

export const getAllInternalMeetingsMSTeams = async () => {
	return await MeetingModel.aggregate([{ $match: { deletedAt: { $eq: null } } }])
		.sort({ createdAt: -1 })
		.then((meetings) => {
			return meetings;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};
