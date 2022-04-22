import { Request, Response, NextFunction } from "express";
import MeetingService from "../services";

export const scheduleInternalMeeting = async (request: Request, response: Response, next: NextFunction) => {
	await MeetingService.scheduleInternalMeetingMSTeams(request, request.body)
		.then((data: any) => {
			request.handleResponse.successRespond(response)(data);
			next();
		})
		.catch((error: any) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
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

export const deleteMeetingPermanently = (request: Request, response: Response, next: NextFunction) => {
	const meetingId = request.params.meetingId;
	if (meetingId) {
		MeetingService.deleteMeetingPermanently(meetingId)
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

export const scheduleInterviewMeeting = async (request: Request, response: Response, next: NextFunction) => {
	await MeetingService.scheduleInterviewMeetingMSTeams(request.body)
		.then((data: any) => {
			request.handleResponse.successRespond(response)(data);
			next();
		})
		.catch((error: any) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};
