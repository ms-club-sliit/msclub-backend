import { DocumentDefinition, Schema } from "mongoose";
import { IMeeting, IMeetingRequest, IUpdatedBy } from "../../interfaces";
import MeetingModel from "../models/Meeting.model";
import axios from "axios";

export const scheduleInternalMeetingMSTeams = (meetingData: DocumentDefinition<IMeeting>) => {
	return axios
		.post(`${process.env.MS_MEETING_MANAGER_API}/api/msteams/internalmeeting/schedule`, meetingData)
		.then(async (sceduleMeeting) => {
			const meetingInfo = new MeetingModel({
				meetingId: sceduleMeeting.data.body.id,
				meetingName: meetingData.meetingName,
				startDateTime: meetingData.startDateTime,
				endDateTime: meetingData.endDateTime,
				emailList: meetingData.emailList,
				scheduledLink: sceduleMeeting.data.body.onlineMeeting.joinUrl,
				type: "INTERNAL",
				meetProvider: "MSMEET",
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
	return await MeetingModel.aggregate([{ $match: { deletedAt: { $eq: null }, type: { $eq: "INTERNAL" } } }])
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
				scheduledLink: sceduleMeeting.data.body.onlineMeeting.joinUrl,
				type: "INTERVIEW",
				meetProvider: "MSMEET"
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
export const scheduleInterviewGoogleMeeting = async (meetingData: DocumentDefinition<IMeeting>) => {
	
	let res = await axios.post(`${process.env.MS_MEETING_MANAGER_API}/api/googlemeet/internalmeeting/schedule`, meetingData);

	if(res.status != 200)
		throw new Error("Something went wrong in the meeting service");

	let data = res.data;

	let new_meeting = new MeetingModel({
		 ...data, 
		 meetProvider: "GOOGLEMEET",
		 type: "INTERVIEW"
	});

	return await new_meeting.save();
}

export const scheduleInternalGoogleMeeting = async (meetingData: DocumentDefinition<IMeeting>) => {
	
	let res = await axios.post(`${process.env.MS_MEETING_MANAGER_API}/api/googlemeet/internalmeeting/schedule`, meetingData);

	if(res.status != 200)
		throw new Error("Something went wrong in the meeting service");

	let data = res.data;

	let new_meeting = new MeetingModel({
		 ...data, 
		 meetProvider: "GOOGLEMEET",
		 type: "INTERNAL"
	});

	return await new_meeting.save();
}

export const updateMeeting = async (
	meetingId: string,
	updateInfo: any,
	user: Schema.Types.ObjectId
) => {
	const meeting = await MeetingModel.findById(meetingId).exec();

	if(!meeting)
		throw new Error("Meeting ID not found");

	let res;

	switch(meeting.meetProvider){
		case "GOOGLEMEET":
			res = await axios.patch(`${process.env.MS_MEETING_MANAGER_API}/api/googlemeet/meeting/${meeting.meetingId}`, updateInfo);
			break;
		case "MSMEET":
			res = await axios.patch(`${process.env.MS_MEETING_MANAGER_API}/api/msteams/meeting/${meeting.meetingId}`, updateInfo)
			break;
		default:
			throw new Error("Document has no meetProvider set");
	}

	if(!res || res.status != 200)
		throw new Error("Something went wrong in the meeting service");
	
	for(const key in updateInfo){
		let d = updateInfo[key];
		if(d) meeting.set(key, d);
	}
	
	const updateUserInfo: IUpdatedBy = {
		user: user,
		updatedAt: new Date(),
	};

	meeting.updatedBy.push(updateUserInfo);
	return await meeting.save();
}


export const deleteMeetingPermanently = async (meetingId : string) => {
	const meeting = await MeetingModel.findById(meetingId);

	if(!meeting)
		throw new Error("Meeting ID not found");

	let res;
	switch(meeting.meetProvider){
		case "MSMEET":
			res = await axios.delete(`${process.env.MS_MEETING_MANAGER_API}/api/msteams/internalmeeting/${meeting.meetingId}`)
			break;
		case "GOOGLEMEET":
			res = await axios.delete(`${process.env.MS_MEETING_MANAGER_API}/api/googlemeet/meeting/${meeting.meetingId}`);
			break;
		default:
			throw new Error("Document has no meetProvider set");
	}

	if(res.status != 200)
		throw new Error("Something went wrong in the meeting service.");

	return await MeetingModel.findByIdAndDelete(meetingId);
}
