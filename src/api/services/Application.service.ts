/*
 * Created on Sat Feb 12 2022
 *
 * The GNU General Public License v3.0
 * Copyright (c) 2022 MS Club SLIIT Authors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program at
 *
 *     https://www.gnu.org/licenses/
 *
 * This program is distributed in the hope that it will be useful
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 */

import { IApplication, IInterview, IMeetingRequest, IPaginatedApplicationResponse, IAdminStats } from "../../interfaces";

// Type alias for document data
type DocumentData<T> = Partial<T>;
import ApplicationModel from "../models/Application.model";
import ContactModel from "../models/Contact.model";
import EventModel from "../models/Event.model";
import UserModel from "../models/User.model";
import EmailModel from "../models/Email.model";
import { Request } from "express";
import { EmailTemplate, EmailType, EmailStatus } from "./Service.constant";
import moment from "moment";
import MeetingService from "../services";
import MeetingModel from "../models/Meeting.model";

/**
 * Application Service
 * @param {IApplication} application
 * @returns {Promise<IApplication>}
 */
export const addApplication = async (request: Request, applicationData: IApplication) => {
	return await ApplicationModel.create(applicationData)
		.then(async (application) => {
			const email = {
				templateName: EmailTemplate.Application,
				to: application.email,
				subject: "MS Club SLIIT - Application Received",
				body: {
					studentId: application.studentId,
					name: application.name,
					email: application.email,
					contactNumber: application.contactNumber,
					currentAcademicYear: application.currentAcademicYear,
					linkedIn: application.linkedIn,
					gitHub: application.gitHub,
					skillsAndTalents: application.skillsAndTalents,
				},
				status: EmailStatus.Waiting,
				type: EmailType.Application,
			};

			// Add email information to email collection
			await EmailModel.create(email);
			return application;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

/**
  Application Service
 * @param applicationId @type string
 * @returns {Promise<IApplication>}
 */
export const fetchApplicationById = async (applicationId: string) => {
	return await ApplicationModel.findById(applicationId)
		.populate("meeting")
		.then((application) => {
			return application;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

/**
 * Fetches a paginated list of active (non-deleted) applications.
 *
 * @param page    - Page number to retrieve (1-indexed). Defaults to 1.
 * @param limit   - Number of records per page. Defaults to 10.
 * @param status  - Optional status filter: "PENDING" | "INTERVIEW" | "SELECTED" | "REJECTED".
 *                  When omitted, all non-deleted applications are returned.
 * @returns       - A paginated response containing the data array and pagination metadata.
 */
export const fetchApplications = async (
	page: number,
	limit: number,
	status?: string
): Promise<IPaginatedApplicationResponse> => {
	const skip = (page - 1) * limit;

	// Build the match filter: always exclude soft-deleted records
	const matchFilter: Record<string, any> = { deletedAt: { $eq: null } };
	if (status) {
		matchFilter.status = status;
	}

	return await ApplicationModel.countDocuments(matchFilter)
		.then(async (totalRecords) => {
			const totalPages = Math.ceil(totalRecords / limit);

			const applications = await ApplicationModel.aggregate([
				{ $match: matchFilter },
				{ $sort: { createdAt: -1 } },
				{ $skip: skip },
				{ $limit: limit },
			]);

			// Populate meeting references after aggregation
			await MeetingModel.populate(applications, { path: "meeting" });

			return {
				data: applications,
				pagination: {
					totalRecords,
					totalPages,
					currentPage: page,
					limit,
					hasNextPage: page < totalPages,
					hasPrevPage: page > 1,
				},
			};
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

/**
 delete an Application
 * @param applicationId @type string
 */
export const archiveApplication = async (applicationId: string) => {
	return await ApplicationModel.findById(applicationId)
		.then(async (application) => {
			if (application && application.deletedAt === null) {
				application.deletedAt = new Date();
				return await application.save();
			} else {
				return "Application not found";
			}
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

/**
 * @function changeApplicationStatusIntoInterview to update the status into INTERVIEW of an application in the system
 * @param applicationId @type string
 */
export const changeApplicationStatusIntoInterview = async (
	request: Request,
	applicationId: string,
	interviewData: IInterview
) => {
	return await ApplicationModel.findById(applicationId)
		.then(async (application) => {
			if (application) {
				// Send email
				// const to = application.email;
				// const subject = "MS Club of SLIIT - Interview";
				// const emailBodyData = {
				// 	name: application.name,
				// 	email: application.email,
				// 	date: moment.utc(interviewData.startDateTime).format("LL"),
				// 	time: moment.utc(interviewData.startDateTime).format("LTS"),
				// 	format: interviewData.format,
				// };

				// const email = {
				// 	templateName: EmailTemplate.Interview,
				// 	to: to,
				// 	subject: subject,
				// 	body: emailBodyData,
				// 	status: EmailStatus.Waiting,
				// 	type: EmailType.Interview,
				// };

				const email = {
					templateName: EmailTemplate.Application,
					to: application.email,
					subject: "MS Club SLIIT - Interview",
					body: {
						name: application.name,
						email: application.email,
						date: moment.utc(interviewData.startDateTime).format("LL"),
						time: moment.utc(interviewData.startDateTime).format("LTS"),
						format: interviewData.format,
					},
					status: EmailStatus.Waiting,
					type: EmailType.Application,
				};

				// Add email information to email collection
				await EmailModel.create(email);

				const applicantMail = `${application.studentId.toLowerCase()}@my.sliit.lk`;
				const emailList = interviewData.attendees;
				emailList.push(applicantMail);
				const interviewScheduleDetails: any = {
					meetingName: application.name,
					startDateTime: interviewData.startDateTime,
					endDateTime: interviewData.endDateTime,
					emailList: emailList,
				};

				application.status = "INTERVIEW";

				return await MeetingService.scheduleInterviewMeetingMSTeams(interviewScheduleDetails)
					.then(async (data: any) => {
						application.meeting = data;
						return await application
							.save()
							.then((application) => {
								return application;
							})
							.catch((error: any) => {
								throw new Error(error.message);
							});
					})
					.catch((error: any) => {
						throw new Error(error.message);
					});
			} else {
				return null;
			}
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

/**
 * @function changeApplicationStatusIntoSelected to update the status into SELECTED of an application in the system
 * @param applicationId @type string
 */
export const changeApplicationStatusIntoSelected = async (request: Request, applicationId: string) => {
	return await ApplicationModel.findById(applicationId)
		.then(async (application) => {
			if (application) {
				const email = {
					templateName: EmailTemplate.Selected,
					to: application.email,
					subject: "Congratulations from MS Club Team",
					body: {
						name: application.name,
					},
					status: EmailStatus.Waiting,
					type: EmailType.Selected,
				};

				// Add email information to email collection
				await EmailModel.create(email);

				// Send email data to message queue
				// const channel = request.channel;
				// request.queue.publishMessage(channel, JSON.stringify(email));
				application.status = "SELECTED";
				return await application.save();
			} else {
				return null;
			}
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

/**
 * @function changeApplicationStatusIntoRejected to update the status into REJECTED of
 * an application in the system
 * @param applicationId @type string
 */
export const changeApplicationStatusIntoRejected = async (applicationId: string) => {
	return await ApplicationModel.findById(applicationId)
		.then(async (application) => {
			if (application) {
				application.status = "REJECTED";
				return await application.save();
			}
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

/**
 * @todo create @function fetchPendingApplications to filter PENDING applications in the system
 */
export const fetchPendingApplications = async () => {
	return await ApplicationModel.aggregate([{ $match: { status: { $eq: "PENDING" }, deletedAt: { $eq: null } } }])
		.sort({ createdAt: -1 })
		.then((applications) => {
			return applications;
		})
		.catch((err) => {
			throw new Error(err.message);
		});
};
/**
 * @todo create @function fetchInterviewApplications to filter INTERVIEW applications in the system
 */
export const fetchInterviewApplications = async () => {
	return await ApplicationModel.aggregate([{ $match: { status: { $eq: "INTERVIEW" }, deletedAt: { $eq: null } } }])
		.sort({ createdAt: -1 })
		.then((applications) => {
			return applications;
		})
		.catch((err) => {
			throw new Error(err.message);
		});
};
/**
 * @todo create @function fetchSelectedApplications to filter SELECTED applications in the system
 */
export const fetchSelectedApplications = async () => {
	return await ApplicationModel.aggregate([{ $match: { status: { $eq: "SELECTED" }, deletedAt: { $eq: null } } }])
		.sort({ createdAt: -1 })
		.then((applications) => {
			return applications;
		})
		.catch((err) => {
			throw new Error(err.message);
		});
};
/**
 * @todo create @function fetchRejectedApplications to filter REJECTED applications in the system
 */
export const fetchRejectedApplications = async () => {
	return await ApplicationModel.aggregate([{ $match: { status: { $eq: "REJECTED" }, deletedAt: { $eq: null } } }])
		.sort({ createdAt: -1 })
		.then((applications) => {
			return applications;
		})
		.catch((err) => {
			throw new Error(err.message);
		});
};

/**
Get deleted applications - admin
 */
export const getDeletedApplicationsForAdmin = async () => {
	return await ApplicationModel.aggregate([{ $match: { deletedAt: { $ne: null } } }])
		.sort({ createdAt: -1 })
		.then((applications) => {
			return applications;
		})
		.catch((err) => {
			throw new Error(err.message);
		});
};

/*
Recover deleted applications
*/
export const recoverDeletedApplication = async (applicationId: string) => {
	if (applicationId) {
		return await ApplicationModel.findById(applicationId)
			.then(async (application) => {
				if (application) {
					if (application.deletedAt !== null) {
						application.deletedAt = null;

						return await application.save();
					} else {
						return { message: "This application is not deleted!", dateTime: new Date() };
					}
				} else {
					throw new Error("Application is not found");
				}
			})
			.catch((error) => {
				throw new Error(error.message);
			});
	} else {
		throw new Error("Application ID not Passed");
	}
};

/*
delete application from the system permanently
*/

export const deleteApplicationPermanently = async (applicationId: string) => {
	if (applicationId) {
		return await ApplicationModel.findByIdAndDelete(applicationId)
			.then((application) => {
				return application;
			})
			.catch((error) => {
				throw new Error(error.message);
			});
	} else {
		throw new Error("Application ID not Passed");
	}
};

/**
 * @function getAdminStats
 * Retrieves a consolidated statistics payload for the admin dashboard.
 *
 * Returns:
 *  - Application status breakdown (PENDING, INTERVIEW, SELECTED, REJECTED, total)
 *  - Total number of inquiries (non-deleted)
 *  - Total number of registered users (non-deleted)
 *  - Total number of events (non-deleted)
 *  - Last 10 most recent applications (non-deleted), sorted by createdAt DESC
 *
 * Uses countDocuments() and aggregation for performance.
 *
 * @returns {Promise<IAdminStats>}
 */
export const getAdminStats = async (): Promise<IAdminStats> => {
	const activeApplicationFilter = { deletedAt: { $eq: null } };

	const [pending, interview, selected, rejected, totalApplications, totalInquiries, totalUsers, totalEvents, recentApplications] =
		await Promise.all([
			ApplicationModel.countDocuments({ ...activeApplicationFilter, status: "PENDING" }),
			ApplicationModel.countDocuments({ ...activeApplicationFilter, status: "INTERVIEW" }),
			ApplicationModel.countDocuments({ ...activeApplicationFilter, status: "SELECTED" }),
			ApplicationModel.countDocuments({ ...activeApplicationFilter, status: "REJECTED" }),
			ApplicationModel.countDocuments(activeApplicationFilter),
			ContactModel.countDocuments({ deletedAt: { $eq: null } }),
			UserModel.countDocuments({ deletedAt: { $eq: null } }),
			EventModel.countDocuments({ deletedAt: { $eq: null } }),
			ApplicationModel.aggregate([
				{ $match: activeApplicationFilter },
				{ $sort: { createdAt: -1 } },
				{ $limit: 10 },
				{
					$project: {
						_id: 1,
						name: 1,
						status: 1,
						appliedAt: "$createdAt",
						studentId: 1,
						currentAcademicYear: 1,
					},
				},
			] as any[]),
		]);

	return {
		applications: {
			pending,
			interview,
			selected,
			rejected,
			total: totalApplications,
		},
		inquiries: {
			total: totalInquiries,
		},
		users: {
			total: totalUsers,
		},
		events: {
			total: totalEvents,
		},
		recentApplications,
	};
};
