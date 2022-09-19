import { Request, Response, NextFunction } from "express";
import * as MeetingService from "../services/Meeting.service";
import { MeetProvider } from "../enums/MeetProvider";

export const scheduleInternalMeeting = async (request: Request, response: Response, next: NextFunction) => {
	try{
		
		let provider = request.query.meetProvider as MeetProvider;
		let data;
		
		switch(provider) {
			case MeetProvider.GOOGLEMEET:
				data = await MeetingService.scheduleInternalGoogleMeeting(request.body);
				break;

			case MeetProvider.MSMEET:
				data = await MeetingService.scheduleInternalMeetingMSTeams(request.body);
				break;

			default:
				throw new Error("Invalid request. is meetProvider set?");
		}
		
		request.handleResponse.successRespond(response)(data);
	}catch(error: any){
		console.error(error)
		request.handleResponse.errorRespond(response)(error.message);
	}

	next();
};

export const getAllInternalMeetings = async (request: Request, response: Response, next: NextFunction) => {
	await MeetingService.getAllInternalMeetingsMSTeams()
		.then((data) => {
			request.handleResponse.successRespond(response)(data);
			next();
		})
		.catch((error: any) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};

export const deleteMeeting = async (request: Request, response: Response, next: NextFunction) => {
	const meetingId = request.params.meetingId;
	const deletedBy = request.user && request.user._id ? request.user._id : null;
	
	if (meetingId) {
		await MeetingService.deleteMeeting(meetingId, deletedBy)
			.then((data: any) => {
				request.handleResponse.successRespond(response)(data);
				next();
			})
			.catch((error: any) => {
				request.handleResponse.errorRespond(response)(error.message);
				next();
			});
	} else {
		request.handleResponse.errorRespond(response)("Meeting ID not found");
	}


};

export const getInternalMeetingById = async (request: Request, response: Response, next: NextFunction) => {
	const meetingId = request.params.meetingId;
	if (meetingId) {
		await MeetingService.fetchMeetingById(request.params.meetingId)
			.then((data) => {
				request.handleResponse.successRespond(response)(data);
				next();
			})
			.catch((error: any) => {
				request.handleResponse.errorRespond(response)(error.message);
				next();
			});
	} else {
		request.handleResponse.errorRespond(response)("MeetingId not found");
	}
};

export const updateMeeting = async (request: Request, response: Response, next: NextFunction) => {
	const meetingId = request.params.meetingId;
	const updatedBy = request.user && request.user._id ? request.user._id : null;

	if (meetingId) {
		await MeetingService.updateMeeting(meetingId, request.body, updatedBy)
			.then((data: any) => {
				request.handleResponse.successRespond(response)(data);
				next();
			})
			.catch((error: any) => {
				request.handleResponse.errorRespond(response)(error.message);
				next();
			});
	} else {
		request.handleResponse.errorRespond(response)("MeetingId not found");
	}
};

export const deleteMeetingPermanently = async (request: Request, response: Response, next: NextFunction) => {
	try{
		const meetingId = request.params.meetingId;
	
		if(!meetingId) {
			request.handleResponse.errorRespond(response)("MeetingId not found");
			return;
		}

		let data = await MeetingService.deleteMeetingPermanently(meetingId);

		request.handleResponse.successRespond(response)(data);
	}catch(error : any){
		console.error(error);
		request.handleResponse.errorRespond(response)(error.message);
	}

	next();
};

export const scheduleInterviewMeeting = async (request: Request, response: Response, next: NextFunction) => {
	try{
		let provider = request.query.meetProvider as MeetProvider;
		let data;
		
		switch(provider) {
			case MeetProvider.GOOGLEMEET:
				data = await MeetingService.scheduleInterviewGoogleMeeting(request.body);
				break;

			case MeetProvider.MSMEET:
				data = await MeetingService.scheduleInterviewMeetingMSTeams(request.body);
				break;

			default:
				throw new Error("Invalid request. is meetProvider set?");
		}
		
		request.handleResponse.successRespond(response)(data);
	}catch(error : any){
		request.handleResponse.errorRespond(response)(error.message);
	}
	
	next();
};