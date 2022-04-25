import { DocumentDefinition, Schema } from "mongoose";
import { IMeeting, IMeetingRequest, IUpdatedBy } from "../../interfaces";
import MeetingModel from "../models/Meeting.model";
import { Request } from "express";
import axios from "axios";

export const scheduleInternalMeetingMSTeams = (request: Request, meetingData: DocumentDefinition<IMeeting>) => {
	return axios
		.post(`${process.env.MS_MEETING_MANAGER_API}/api/msteams/internalmeeting/schedule`, meetingData)
		.then(async (sceduleMeeting) => {
			const meetingInfo = new MeetingModel({
				meetingId: sceduleMeeting.data.body.id,
				meetingName: meetingData.meetingName,
				startDateTime: meetingData.startDateTime,
				endDateTime: meetingData.endDateTime,
				emailList: meetingData.emailList,
				sheduledLink: sceduleMeeting.data.body.onlineMeeting.joinUrl,
				type: "INTERNAL",
			});

			return await meetingInfo
				.save()
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

export const deleteMeeting = async (meetingId: string, deletedBy: Schema.Types.ObjectId) => {
	return await MeetingModel.findById(meetingId)
		.then(async (meetingDetails) => {
			if (meetingDetails && meetingDetails.deletedAt === null) {
				meetingDetails.deletedAt = new Date();
				meetingDetails.deletedBy = deletedBy;
				return await meetingDetails.save();
			} else {
				return "Meeting not found";
			}
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

export const fetchMeetingById = async (meetingId: string) => {
	return await MeetingModel.findById(meetingId)
		.then((meeting) => {
			return meeting;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

export const updateMeeting = async (
	meetingId: string,
	updateInfo: DocumentDefinition<IMeeting>,
	user: Schema.Types.ObjectId
) => {
	const meeting = await MeetingModel.findById(meetingId);
	if (meeting) {
		return axios
			.patch(`${process.env.MS_MEETING_MANAGER_API}/api/msteams/meeting/${meeting.meetingId}`, updateInfo)
			.then(async (res) => {
				if (res.status == 200) {
					if (updateInfo.meetingId) {
						meeting.meetingId = updateInfo.meetingId;
					}

					if (updateInfo.meetingName) {
						meeting.meetingName = updateInfo.meetingName;
					}

					if (updateInfo.startDateTime) {
						meeting.startDateTime = updateInfo.startDateTime;
					}

					if (updateInfo.endDateTime) {
						meeting.endDateTime = updateInfo.endDateTime;
					}

					if (updateInfo.emailList) {
						meeting.emailList = updateInfo.emailList;
					}

					if (updateInfo.sheduledLink) {
						meeting.sheduledLink = updateInfo.sheduledLink;
					}
					const updateUserInfo: IUpdatedBy = {
						user: user,
						updatedAt: new Date(),
					};
					meeting.updatedBy.push(updateUserInfo);
					return await meeting.save();
				} else {
					throw new Error("Meeting ID not found");
				}
			})
			.catch((error) => {
				throw new Error(error.message);
			});
	} else {
		return "Meeting not found";
	}
};

export const deleteMeetingPermanently = async (meetingId: string) => {
	const meeting = await MeetingModel.findById(meetingId);
	if (meeting) {
		return axios
			.delete(`${process.env.MS_MEETING_MANAGER_API}/api/msteams/internalmeeting/${meeting.meetingId}`)
			.then(async () => {
				return MeetingModel.findByIdAndDelete(meetingId)
					.then((deletedmeeting) => {
						return deletedmeeting;
					})
					.catch((error) => {
						throw new Error(error.message);
					});
			})
			.catch((error) => {
				throw new Error(error.message);
			});
	}
};

export const scheduleInterviewMeetingMSTeams = (meetingData: DocumentDefinition<IMeetingRequest>) => {
	return axios
		.post(`${process.env.MS_MEETING_MANAGER_API}/api/msteams/schedule`, meetingData)
		.then(async (sceduleMeeting) => {
			const meetingInfo = new MeetingModel({
				meetingId: sceduleMeeting.data.body.id,
				meetingName: meetingData.meetingName,
				startDateTime: sceduleMeeting.data.body.start.dateTime,
				endDateTime: sceduleMeeting.data.body.end.dateTime,
				emailList: meetingData.emailList,
				sheduledLink: sceduleMeeting.data.body.onlineMeeting.joinUrl,
				type: "INTERVIEW",
			});

			return await meetingInfo
				.save()
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
