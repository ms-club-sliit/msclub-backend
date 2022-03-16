import { Request, Response, NextFunction } from "express";
import MeetingService from "../services";

export const addInternalMeetingMSTeams = async (request: Request, response: Response, next: NextFunction) => {
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

export const getMeetings = async (request: Request, response: Response, next: NextFunction) => {
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
