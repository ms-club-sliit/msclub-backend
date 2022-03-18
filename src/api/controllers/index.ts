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

import {
	createUser,
	login,
	loginByFaceAuthentication,
	getAuthUser,
	getAllUsers,
	updateUser,
	adminUpdateUser,
	removeUser,
	removeUserPermenently,
	recoverUser,
	getRemovedUsers,
} from "./User.controller";

import {
	createContact,
	getAllContacts,
	removeContact,
	removedContacts,
	removeContactPermanently,
	recoverRemovedInquiry,
} from "./Contact.controller";

import {
	insertEvent,
	getEvent,
	getEvents,
	getPastEvents,
	getUpcomingEvent,
	updateEvent,
	deleteEvent,
	eventsForAdmin,
	deletedEventsForAdmin,
	deleteEventPermanently,
	recoverRemovedEvent,
} from "./Event.controller";

import {
	insertWebinar,
	getWebinarById,
	getWebinars,
	getPastWebinars,
	getUpcomingWebinar,
	updateWebinar,
	deleteWebinar,
	webinarsForAdmin,
	deletedWebinarsForAdmin,
	recoverRemovedWebinar,
	deleteWebinarPermanently,
} from "./Webinar.controller";

import {
	insertTopSpeaker,
	getTopSpeaker,
	getTopSpeakers,
	updateTopSpeaker,
	deleteTopSpeaker,
	recoverDeletedTopSpeaker,
	getAllTopSpeakersForAdmin,
	getDeletedTopSpeakersForAdmin,
	permenentDeleteTopSpeaker,
} from "./TopSpeaker.controller";

import {
	addApplication,
	getApplicationById,
	getApplications,
	setApplicationArchive,
	changeApplicationStatusIntoInterview,
	changeApplicationStatusIntoSelected,
	changeApplicationStatusIntoRejected,
	fetchPendingApplications,
	fetchSelectedApplications,
	fetchInterviewApplications,
	fetchRejectedApplications,
	getDeletedApplicationsForAdmin,
	recoverRemovedApplication,
	deleteApplicationPermanently,
} from "./Application.controller";

import {
	getBoardMemberbyID,
	getAllBoardMembers,
	updateBoardMemberDetails,
	deleteBoardMemberDetails,
} from "./BoardMember.controller";

import {
	insertExecutiveBoard,
	getExecutiveBoardbyID,
	getExecutiveBoard,
	addBoardMember,
	updateExecutiveBoardDetails,
	deleteExecutiveBoardDetails,
} from "./ExecutiveBoard.controller";

import {
	insertOrganization,
	getOrganization,
	getOrganizationForAdmin,
	updateOrganization,
} from "./Organization.controller";

import { scheduleInternalMeeting, getAllInternalMeetings } from "./Meeting.controller";

export default {
	//User Controllers
	createUser,
	login,
	loginByFaceAuthentication,
	getAuthUser,
	getAllUsers,
	updateUser,
	adminUpdateUser,
	removeUser,
	removeUserPermenently,
	recoverUser,
	getRemovedUsers,
	removeContactPermanently,
	//Contact Controllers
	createContact,
	getAllContacts,
	removeContact,
	removedContacts,
	recoverRemovedInquiry,
	//Event Controllers
	insertEvent,
	getEvent,
	getEvents,
	getPastEvents,
	getUpcomingEvent,
	updateEvent,
	deleteEvent,
	eventsForAdmin,
	deletedEventsForAdmin,
	deleteEventPermanently,
	recoverRemovedEvent,
	//Webinar Controllers
	insertWebinar,
	getWebinarById,
	getWebinars,
	getPastWebinars,
	getUpcomingWebinar,
	updateWebinar,
	deleteWebinar,
	webinarsForAdmin,
	deletedWebinarsForAdmin,
	recoverRemovedWebinar,
	deleteWebinarPermanently,
	//Executive board Controllers
	insertExecutiveBoard,
	getExecutiveBoardbyID,
	getExecutiveBoard,
	addBoardMember,
	updateExecutiveBoardDetails,
	deleteExecutiveBoardDetails,
	//Top Speaker Controllers
	insertTopSpeaker,
	getTopSpeaker,
	getTopSpeakers,
	updateTopSpeaker,
	deleteTopSpeaker,
	recoverDeletedTopSpeaker,
	getAllTopSpeakersForAdmin,
	getDeletedTopSpeakersForAdmin,
	permenentDeleteTopSpeaker,
	//Board Member Controllers
	getBoardMemberbyID,
	getAllBoardMembers,
	updateBoardMemberDetails,
	deleteBoardMemberDetails,
	//Application Controllers
	addApplication,
	getApplicationById,
	getApplications,
	setApplicationArchive,
	changeApplicationStatusIntoInterview,
	changeApplicationStatusIntoSelected,
	changeApplicationStatusIntoRejected,
	fetchPendingApplications,
	fetchSelectedApplications,
	fetchInterviewApplications,
	fetchRejectedApplications,
	getDeletedApplicationsForAdmin,
	recoverRemovedApplication,
	deleteApplicationPermanently,
	// Organization Controllers
	insertOrganization,
	getOrganization,
	getOrganizationForAdmin,
	updateOrganization,
	// Meeting Controllers
	scheduleInternalMeeting,
	getAllInternalMeetings,
};
